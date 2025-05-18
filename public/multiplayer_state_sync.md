---
title: マルチプレイヤーVR/MRゲームにおける状態同期実装
tags:
  - Unity
  - Photon
  - VR
  - MR
  - GameDevelopment
private: false
updated_at: '2024-09-15T14:30:00+09:00'
id: a7c9e23f18d7ab921450
organization_url_name: game-dev-team
slide: false
ignorePublish: false
---

マルチプレイヤーゲーム開発において, プレイヤー状態の同期は最も重要な課題の一つである. 特にVR（仮想現実）とMR（複合現実）が混在する環境では, 異なるプラットフォーム間での状態同期がさらに複雑になる. 本記事では, VR/MRゲームにおけるプレイヤーの状態同期問題とその解決策について解説する.

## 問題の概要

私たちのゲームでは, 複数のVRプレイヤーとMRプレイヤーが存在し, 特定のオブジェクトと接触するとプレイヤーが無効化される仕組みになっている. しかし, 以下のような同期の問題が発生していた:

1. MR側からはVRプレイヤーが無効化状態（透明）に見えるが, VR側からは無効化状態に見えない
2. 有効プレイヤー数（aliveCount）がプレイヤー状態配列の状態と一致しない
3. 状態変更のロジックが複数の場所に分散している

これらの問題により, プレイヤー間で一貫性のない体験が生じていた.

## 現状のシステム分析

現在のシステムでは, プレイヤー状態を変更するロジックが主にCollisionDetector.csに実装されている.

```csharp
// CollisionDetector.csの既存コード（簡略化）
private void OnTriggerEnter(Collider other)
{
    if (other.CompareTag("Player"))
    {
        string playerName = other.gameObject.name;
        StateManager.Instance.DisableLogic(playerName);
    }
}
```

StateManagerのDisableLogicでは, プレイヤー名を受け取り, isActiveをfalseに設定し, GameManagerのplayerStatusを更新している.

```csharp
// StateManager.csの既存コード（簡略化）
public void DisableLogic(string playerName)
{
    isActive = false;

    for (int i = 0; i < GameManager.Instance.PlayerNameArray.Length; i++)
    {
        if (GameManager.Instance.PlayerNameArray[i] == playerName)
        {
            GameManager.Instance.playerStatus[i] = true;
            GameManager.Instance.aliveCount--;
        }
    }
}
```

GameManagerでは, playerStatusの配列を使ってプレイヤーの状態を管理している.

```csharp
// GameManager.csの既存コード（簡略化）
public string[] PlayerNameArray;
public bool[] playerStatus;
public int aliveCount;
```

## 解決策の実装

### 1. CollisionDetector.csの修正

まず, CollisionDetector.csをPhotonのRPCを使って同期するように修正する.

```csharp
// 修正後のCollisionDetector.cs
using Photon.Pun;

public class CollisionDetector : MonoBehaviourPun
{
    private void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Player"))
        {
            string playerName = other.gameObject.name;
            // 全プレイヤーに接触情報を共有
            photonView.RPC("PlayerCollisionDetected", RpcTarget.AllBuffered, playerName);
        }
    }

    [PunRPC]
    public void PlayerCollisionDetected(string playerName)
    {
        // 既に無効化されているプレイヤーは処理しない
        if (IsPlayerAlreadyDisabled(playerName)) return;

        // プレイヤーの状態を更新
        UpdatePlayerStatus(playerName);

        // 視覚エフェクトを適用
        ApplyVisualEffects(playerName);
    }

    private bool IsPlayerAlreadyDisabled(string playerName)
    {
        for (int i = 0; i < GameManager.Instance.PlayerNameArray.Length; i++)
        {
            if (GameManager.Instance.PlayerNameArray[i] == playerName)
            {
                return GameManager.Instance.playerStatus[i];
            }
        }
        return false;
    }

    private void UpdatePlayerStatus(string playerName)
    {
        for (int i = 0; i < GameManager.Instance.PlayerNameArray.Length; i++)
        {
            if (GameManager.Instance.PlayerNameArray[i] == playerName)
            {
                GameManager.Instance.playerStatus[i] = true;
                GameManager.Instance.UpdateAliveCountFromStatus();
                break;
            }
        }
    }

    private void ApplyVisualEffects(string playerName)
    {
        // 該当プレイヤーのGameObjectを探す
        GameObject playerObject = GameObject.Find(playerName);
        if (playerObject != null)
        {
            // VRプレイヤーの場合
            if (playerObject.GetComponent<VRPlayerController>() != null)
            {
                // 透明化処理と画面エフェクト処理
                // （実際の実装はプロジェクトに依存）
            }
            // MRプレイヤーの場合
            else if (playerObject.GetComponent<MRPlayerController>() != null)
            {
                // 透明化処理
                // （実際の実装はプロジェクトに依存）
            }
        }
    }
}
```

### 2. GameManagerの修正

次に, GameManagerにaliveCountを更新するメソッドを追加する.

```csharp
// 修正後のGameManager.cs（追加部分）
public void UpdateAliveCountFromStatus()
{
    int activePlayerCount = 0;

    for (int i = 0; i < playerStatus.Length; i++)
    {
        if (!playerStatus[i])
        {
            activePlayerCount++;
        }
    }

    aliveCount = activePlayerCount;

    // すべてのプレイヤーが無効化された場合, ゲーム終了状態に移行
    if (aliveCount == 0 && gameState == GameState.PLAY)
    {
        gameState = GameState.END;
    }
}

// ゲーム開始時の初期化処理も修正
public void InitializeGame()
{
    // プレイヤーの状態を初期化
    for (int i = 0; i < playerStatus.Length; i++)
    {
        playerStatus[i] = false;
    }

    // 状態からaliveCountを計算
    UpdateAliveCountFromStatus();

    gameState = GameState.PLAY;
}
```

### 3. StateManagerの修正

最後に, StateManagerをPhotonのRPCを使って同期するように修正する.

```csharp
// 修正後のStateManager.cs
using Photon.Pun;

public class StateManager : MonoBehaviourPun
{
    public static StateManager Instance;
    public bool isActive = true;

    private void Awake()
    {
        Instance = this;
    }

    public void DisableLogic(string playerName)
    {
        // RPCを使って全プレイヤーに状態変更を同期
        photonView.RPC("SyncDisableLogic", RpcTarget.AllBuffered, playerName);
    }

    [PunRPC]
    public void SyncDisableLogic(string playerName)
    {
        // 既に無効化されている場合は処理しない
        for (int i = 0; i < GameManager.Instance.PlayerNameArray.Length; i++)
        {
            if (GameManager.Instance.PlayerNameArray[i] == playerName)
            {
                if (GameManager.Instance.playerStatus[i]) return;

                // 自分のプレイヤーの場合, isActiveをfalseに設定
                if (playerName == PhotonNetwork.LocalPlayer.NickName)
                {
                    isActive = false;
                }

                // playerStatusの更新はCollisionDetector.csで行うので,
                // ここでは二重更新を避けるために処理を省略
            }
        }
    }

    public bool GetMyStatus()
    {
        string myName = PhotonNetwork.LocalPlayer.NickName;

        for (int i = 0; i < GameManager.Instance.PlayerNameArray.Length; i++)
        {
            if (GameManager.Instance.PlayerNameArray[i] == myName)
            {
                return GameManager.Instance.playerStatus[i];
            }
        }

        return false;
    }
}
```

## 解決策の効果

この実装により, 以下の改善が見込まれる:

1. **同期問題の解決**:
   - PhotonのRPCを使って接触情報を全プレイヤーに同期
   - どちらか一方が接触を検出すれば, 全プレイヤーで同じ状態を共有

2. **処理の一元化**:
   - playerStatus配列をソースオブトゥルースとして一元管理
   - aliveCountはplayerStatusから計算するように変更

3. **一貫性の確保**:
   - 視覚エフェクトがVRとMR両方で同時に適用される
   - 生存カウントと状態の整合性が保たれる

## まとめ

マルチプレイヤーVR/MRゲームにおける状態同期は, 一貫したユーザー体験を提供するために欠かせない要素である. 本記事で解説した解決策は, Photon RPCを活用して状態同期問題を効果的に解決している.

この解決策の核心は:

1. プレイヤー状態の管理を一元化（GameManager.playerStatus）
2. PhotonのRPCを使った同期処理の実装
3. 接触検知と状態更新の分離

これらの改善により, プレイヤーの状態がVRとMR間で正確に同期され, より一貫した体験を提供できるようになった.

マルチプレイヤーゲーム開発では, このような同期問題が頻繁に発生する. 状態管理を一元化し, 適切な同期メカニズムを実装することで, より安定したゲーム体験を実現できるだろう.
