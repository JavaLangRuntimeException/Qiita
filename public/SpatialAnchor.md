---
title: Meta XR SDKにおけるSpatial Anchorの実装と活用方法
tags:
  - Unity
  - XR
  - MetaQuest
  - SpatialAnchor
  - VR
private: true
updated_at: '2025-04-28T11:13:32+09:00'
id: d292c6bd9f9df26b4350
organization_url_name: null
slide: false
ignorePublish: false
---

VR(仮想現実)とMR(複合現実)の位置合わせって非常に重要です．例えばMRの場合，ユーザーがヘッドセットを外して再度装着した後でも，仮想オブジェクトが元の現実世界の位置に表示されることが可能になるようにしないと，ユーザーが混乱する．また，MR空間とVR空間を繋げる場合，VR空間の位置をMR空間の位置に合わせる必要があり，MR空間であり得ない位置に仮想オブジェクトが表示される場合大変なことになる．

このような場合にSpatial Anchorは非常に重要な役割を果たします．

## Spatial Anchorとは

Spatial Anchor（空間アンカー）は, 現実世界の特定の位置と向きを記録し, その情報を元に仮想オブジェクトを配置するための技術である. Meta Questデバイスでは, OVRSpatialAnchorコンポーネントを使用して実装される. この技術により, ユーザーがVRヘッドセットを外して再度装着した後でも, 仮想オブジェクトが元の現実世界の位置に表示されることが可能になる.

Spatial Anchorの主な特徴は以下の通りである:

1. **持続性**: セッション間でオブジェクトの位置を維持できる
2. **精度**: 現実世界の基準点に対して高精度な位置合わせが可能
3. **共有**: 複数のデバイス間でアンカー情報を共有することができる
4. **保存**: アンカー情報をローカルまたはクラウドに保存できる

## 実装方法

### 基本的な設定

Meta XR SDKでSpatial Anchorを利用するための基本的な設定手順は以下の通りである:

1. Meta XR SDKをUnityプロジェクトにインポートする
2. OVRManagerを設定し, Tracking Originを「Floor Level」に設定する
3. OVRSceneManagerコンポーネントをシーンに追加する
4. 必要なスクリプトリファレンスを追加する（`using Oculus.Interaction.Input`など）

### OVRSpatialAnchorの作成と保存

Spatial Anchorを作成して保存するためのコード例:

```csharp
using UnityEngine;
using Oculus.Interaction;
using System.Collections.Generic;

public class SpatialAnchorManager : MonoBehaviour
{
    // アンカーを作成するためのプレファブ
    public GameObject anchorPrefab;
    // 作成したアンカーを管理するリスト
    private List<OVRSpatialAnchor> createdAnchors = new List<OVRSpatialAnchor>();

    // コントローラーの位置にアンカーを作成するメソッド
    public void CreateAnchor(Transform controllerTransform)
    {
        // アンカープレファブをインスタンス化
        GameObject anchorObject = Instantiate(anchorPrefab, controllerTransform.position, controllerTransform.rotation);

        // OVRSpatialAnchorコンポーネントを取得
        OVRSpatialAnchor anchor = anchorObject.GetComponent<OVRSpatialAnchor>();
        if (anchor == null)
        {
            anchor = anchorObject.AddComponent<OVRSpatialAnchor>();
        }

        // アンカーの作成を開始
        anchor.Save((anchor, success) =>
        {
            if (success)
            {
                Debug.Log("Anchor created successfully with UUID: " + anchor.Uuid);
                createdAnchors.Add(anchor);
            }
            else
            {
                Debug.LogError("Failed to create anchor");
                Destroy(anchorObject);
            }
        });
    }

    // 全てのアンカーを消去するメソッド
    public void ClearAllAnchors()
    {
        foreach (var anchor in createdAnchors)
        {
            if (anchor != null)
            {
                anchor.Erase();
                Destroy(anchor.gameObject);
            }
        }
        createdAnchors.Clear();
    }
}
```

### アンカーの読み込みと配置

保存されたアンカーを読み込み, 仮想オブジェクトを配置するコード例:

```csharp
using UnityEngine;
using System.Collections.Generic;

public class SpatialAnchorLoader : MonoBehaviour
{
    // アンカーに配置するオブジェクトのプレファブ
    public GameObject objectPrefab;
    // 配置したオブジェクトを管理する辞書
    private Dictionary<string, GameObject> placedObjects = new Dictionary<string, GameObject>();

    void Start()
    {
        // 保存されているすべてのアンカーを読み込む
        OVRSpatialAnchor.LoadUnboundAnchors((anchors) =>
        {
            foreach (var anchor in anchors)
            {
                // アンカーが読み込まれると呼び出されるイベントを設定
                anchor.OnLoadComplete += OnAnchorLoadComplete;
            }
        });
    }

    private void OnAnchorLoadComplete(OVRSpatialAnchor anchor, bool success)
    {
        if (success)
        {
            // アンカーの位置にオブジェクトを配置
            GameObject obj = Instantiate(objectPrefab, anchor.transform.position, anchor.transform.rotation);
            obj.transform.parent = anchor.transform;
            placedObjects[anchor.Uuid.ToString()] = obj;

            Debug.Log("Object placed at anchor: " + anchor.Uuid);
        }
        else
        {
            Debug.LogError("Failed to load anchor: " + anchor.Uuid);
        }

        // イベントハンドラを解除
        anchor.OnLoadComplete -= OnAnchorLoadComplete;
    }
}
```

## 共有Spatial Anchorの実装

複数のデバイス間でSpatial Anchorを共有するには, ネットワーク通信を使用してアンカーのUUIDとその他の必要な情報を交換する必要がある.

### Photon PUNを使ったSpatial Anchor共有の詳細実装

Meta QuestデバイスでSpatial Anchorを共有するためには, 効率的なネットワーク通信システムが必要である. ここでは, 多くのVRアプリケーションで利用されているPhoton PUN (Photon Unity Networking)を使った詳細な実装方法を解説する.

#### 1. 準備と設定

まず, Photon PUNをプロジェクトに導入し, 基本的な設定を行う:

1. Unity Asset StoreからPhoton PUN 2をインポート
2. Window > Photon Unity Networking > PUN Wizardを開き, AppIDを設定
3. PhotonServerSettingsで地域設定やその他のネットワークパラメータを設定

プロジェクトにPhoton用の基本クラスを設定する:

```csharp
using Photon.Pun;
using Photon.Realtime;
using System.Collections;
using UnityEngine;

public class NetworkManager : MonoBehaviourPunCallbacks
{
    [SerializeField] private string roomName = "SpatialAnchorRoom";

    private void Start()
    {
        // Photonに接続
        PhotonNetwork.ConnectUsingSettings();
        Debug.Log("Connecting to Photon...");
    }

    public override void OnConnectedToMaster()
    {
        Debug.Log("Connected to Photon Master Server");
        // ルームに参加（ない場合は作成）
        PhotonNetwork.JoinOrCreateRoom(roomName, new RoomOptions { MaxPlayers = 10, IsVisible = true }, TypedLobby.Default);
    }

    public override void OnJoinedRoom()
    {
        Debug.Log("Joined room: " + PhotonNetwork.CurrentRoom.Name);
        // ルーム参加後の処理
    }

    public override void OnPlayerEnteredRoom(Player newPlayer)
    {
        Debug.Log("Player entered room: " + newPlayer.NickName);
        // 他プレイヤーの入室処理
    }
}
```

#### 2. Spatial Anchor共有システムの実装

次に, Spatial Anchorを共有するための専用マネージャークラスを実装する:

```csharp
using Photon.Pun;
using Photon.Realtime;
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SharedAnchorManager : MonoBehaviourPunCallbacks
{
    // シングルトンパターンの実装
    public static SharedAnchorManager Instance { get; private set; }

    // アンカーを作成するためのプレファブ
    [SerializeField] private GameObject anchorPrefab;
    // アンカーに配置するオブジェクトのプレファブ
    [SerializeField] private GameObject objectPrefab;

    // 作成したアンカーを管理するディクショナリ (UUID文字列をキーとする)
    private Dictionary<string, OVRSpatialAnchor> localAnchors = new Dictionary<string, OVRSpatialAnchor>();
    // 共有されたアンカーのUUID一覧
    private List<string> sharedAnchorUuids = new List<string>();
    // アンカーに関連付けられたゲームオブジェクト
    private Dictionary<string, GameObject> anchoredObjects = new Dictionary<string, GameObject>();

    // アンカー共有の進行状況を通知するイベント
    public event Action<float> OnSharingProgress;
    public event Action<string, bool> OnAnchorShared;

    private void Awake()
    {
        // シングルトンパターンの実装
        if (Instance == null)
        {
            Instance = this;
            DontDestroyOnLoad(gameObject);
        }
        else
        {
            Destroy(gameObject);
        }
    }

    // アンカーの作成と共有を行うメソッド
    public void CreateAndShareAnchor(Vector3 position, Quaternion rotation, string objectName = "SharedObject")
    {
        StartCoroutine(CreateAndShareAnchorCoroutine(position, rotation, objectName));
    }

    private IEnumerator CreateAndShareAnchorCoroutine(Vector3 position, Quaternion rotation, string objectName)
    {
        // アンカーオブジェクトの作成
        GameObject anchorObject = Instantiate(anchorPrefab, position, rotation);
        anchorObject.name = "Anchor_" + DateTime.Now.Ticks;

        // アンカーコンポーネントの取得またはアタッチ
        OVRSpatialAnchor anchor = anchorObject.GetComponent<OVRSpatialAnchor>();
        if (anchor == null)
        {
            anchor = anchorObject.AddComponent<OVRSpatialAnchor>();
        }

        // アンカーを保存する前の準備として、ローカルトラッキングが安定するまで待機
        float startTime = Time.time;
        float waitTime = 2.0f; // 2秒間待機

        while (Time.time - startTime < waitTime)
        {
            float progress = (Time.time - startTime) / waitTime;
            OnSharingProgress?.Invoke(progress * 0.2f); // 全体の20%をローカルでの準備に割り当て
            yield return null;
        }

        // アンカーの保存を開始
        bool saveComplete = false;
        anchor.Save((savedAnchor, success) =>
        {
            if (success)
            {
                string anchorUuid = savedAnchor.Uuid.ToString();
                Debug.Log("Anchor created with UUID: " + anchorUuid);

                // ローカルの辞書に保存
                localAnchors[anchorUuid] = savedAnchor;

                // オブジェクトを配置
                GameObject obj = Instantiate(objectPrefab, Vector3.zero, Quaternion.identity, savedAnchor.transform);
                obj.name = objectName;
                anchoredObjects[anchorUuid] = obj;

                // Photon RPCを使用してアンカー情報を共有
                photonView.RPC("ReceiveAnchorData", RpcTarget.Others, anchorUuid, objectName, PhotonNetwork.LocalPlayer.ActorNumber);
            }
            else
            {
                Debug.LogError("Failed to create and save anchor");
                Destroy(anchorObject);
            }

            saveComplete = true;
        });

        // アンカーの保存が完了するまで待機
        while (!saveComplete)
        {
            // 保存中の進捗表示 (20%〜80%の間)
            float progress = 0.2f + (Mathf.Min(Time.time - startTime - waitTime, 10.0f) / 10.0f * 0.6f);
            OnSharingProgress?.Invoke(progress);
            yield return null;
        }

        // 共有操作の完了を示す100%の進捗を通知
        OnSharingProgress?.Invoke(1.0f);
    }

    // 他のデバイスからアンカーデータを受信するRPCメソッド
    [PunRPC]
    public void ReceiveAnchorData(string anchorUuid, string objectName, int senderActorNumber)
    {
        Debug.Log($"Received anchor data from player {senderActorNumber}. UUID: {anchorUuid}");

        if (localAnchors.ContainsKey(anchorUuid))
        {
            // すでにローカルに存在する場合は何もしない
            Debug.Log("Anchor already exists locally");
            return;
        }

        // 受信したUUIDをリストに追加
        sharedAnchorUuids.Add(anchorUuid);

        // アンカーのロードを開始
        StartCoroutine(LoadSharedAnchorCoroutine(anchorUuid, objectName));
    }

    private IEnumerator LoadSharedAnchorCoroutine(string anchorUuidStr, string objectName)
    {
        // UUIDの変換
        System.Guid anchorUuid;
        if (!System.Guid.TryParse(anchorUuidStr, out anchorUuid))
        {
            Debug.LogError("Invalid anchor UUID format");
            OnAnchorShared?.Invoke(anchorUuidStr, false);
            yield break;
        }

        // ロード用オプション設定
        OVRSpatialAnchor.LoadOptions options = new OVRSpatialAnchor.LoadOptions
        {
            Uuids = new System.Guid[] { anchorUuid },
            Timeout = 10 // 10秒タイムアウト
        };

        float startTime = Time.time;
        bool loadComplete = false;
        OVRSpatialAnchor[] loadedAnchors = null;

        // アンカーのロード開始
        OVRSpatialAnchor.LoadUnboundAnchors(options, (anchors) =>
        {
            loadedAnchors = anchors;
            loadComplete = true;
        });

        // アンカーがロードされるまで待機
        while (!loadComplete && Time.time - startTime < 20.0f) // 20秒以内にロードされない場合はタイムアウト
        {
            // 進捗の表示
            float progress = Mathf.Min((Time.time - startTime) / 10.0f, 1.0f);
            OnSharingProgress?.Invoke(progress);
            yield return null;
        }

        // タイムアウトチェック
        if (!loadComplete)
        {
            Debug.LogError("Timed out waiting for anchor to load");
            OnAnchorShared?.Invoke(anchorUuidStr, false);
            yield break;
        }

        // ロード結果の処理
        if (loadedAnchors != null && loadedAnchors.Length > 0)
        {
            OVRSpatialAnchor loadedAnchor = loadedAnchors[0];
            Debug.Log("Successfully loaded shared anchor: " + loadedAnchor.Uuid);

            // ローカル辞書に追加
            localAnchors[anchorUuidStr] = loadedAnchor;

            // アンカーにオブジェクトを配置
            GameObject obj = Instantiate(objectPrefab, Vector3.zero, Quaternion.identity, loadedAnchor.transform);
            obj.name = objectName;
            anchoredObjects[anchorUuidStr] = obj;

            // 成功通知
            OnAnchorShared?.Invoke(anchorUuidStr, true);
        }
        else
        {
            Debug.LogError("Failed to load shared anchor");
            OnAnchorShared?.Invoke(anchorUuidStr, false);
        }
    }

    // アンカーの削除
    public void DeleteAnchor(string anchorUuid)
    {
        if (localAnchors.TryGetValue(anchorUuid, out OVRSpatialAnchor anchor))
        {
            // オブジェクトの削除
            if (anchoredObjects.TryGetValue(anchorUuid, out GameObject obj))
            {
                Destroy(obj);
                anchoredObjects.Remove(anchorUuid);
            }

            // アンカーの削除
            anchor.Erase();
            Destroy(anchor.gameObject);
            localAnchors.Remove(anchorUuid);

            // 他のデバイスにも削除を通知
            photonView.RPC("RemoveSharedAnchor", RpcTarget.Others, anchorUuid);
        }
    }

    [PunRPC]
    public void RemoveSharedAnchor(string anchorUuid)
    {
        Debug.Log("Received request to remove anchor: " + anchorUuid);
        DeleteAnchor(anchorUuid);
    }

    // すべてのアンカーをクリア
    public void ClearAllAnchors()
    {
        List<string> anchorKeys = new List<string>(localAnchors.Keys);
        foreach (string key in anchorKeys)
        {
            DeleteAnchor(key);
        }

        // リストのクリア
        localAnchors.Clear();
        anchoredObjects.Clear();
        sharedAnchorUuids.Clear();
    }

    // 指定したアンカーにアタッチされたオブジェクトを返す
    public GameObject GetAnchoredObject(string anchorUuid)
    {
        if (anchoredObjects.TryGetValue(anchorUuid, out GameObject obj))
        {
            return obj;
        }
        return null;
    }

    // アンカーの存在確認
    public bool DoesAnchorExist(string anchorUuid)
    {
        return localAnchors.ContainsKey(anchorUuid);
    }
}
```

#### 3. Photon Viewコンポーネントの設定

上記スクリプトはPhoton RPCを使用するため, SharedAnchorManagerオブジェクトにPhotonViewコンポーネントを追加する必要がある. Inspectorで以下の設定を行う:

1. PhotonViewコンポーネントを追加
2. Observed ComponentsにSharedAnchorManagerを追加
3. Synchronization TypeをReliable Deltaに設定
4. Owner Ship Transferを適切に設定（通常はRequest以上の設定）

#### 4. Spatial Anchor共有UIの実装

ユーザーがアンカーを配置し, 共有状況を確認できるUIを実装する:

```csharp
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class AnchorSharingUI : MonoBehaviour
{
    [SerializeField] private Button createAnchorButton;
    [SerializeField] private Button clearAnchorsButton;
    [SerializeField] private Slider progressSlider;
    [SerializeField] private TextMeshProUGUI statusText;
    [SerializeField] private Transform anchorPlacementPoint; // コントローラーまたはカメラの位置

    private SharedAnchorManager anchorManager;

    private void Start()
    {
        anchorManager = SharedAnchorManager.Instance;

        if (anchorManager == null)
        {
            Debug.LogError("SharedAnchorManager not found in scene");
            return;
        }

        // ボタンイベントの設定
        createAnchorButton.onClick.AddListener(OnCreateAnchorButtonClicked);
        clearAnchorsButton.onClick.AddListener(OnClearAnchorsButtonClicked);

        // イベントハンドラの設定
        anchorManager.OnSharingProgress += UpdateProgressBar;
        anchorManager.OnAnchorShared += OnAnchorShared;

        // 初期UIの設定
        progressSlider.gameObject.SetActive(false);
        statusText.text = "Ready to create and share anchors";
    }

    private void OnDestroy()
    {
        // イベントハンドラの解除
        if (anchorManager != null)
        {
            anchorManager.OnSharingProgress -= UpdateProgressBar;
            anchorManager.OnAnchorShared -= OnAnchorShared;
        }
    }

    private void OnCreateAnchorButtonClicked()
    {
        statusText.text = "Creating and sharing anchor...";
        progressSlider.gameObject.SetActive(true);
        progressSlider.value = 0;

        // アンカーを作成して共有
        anchorManager.CreateAndShareAnchor(
            anchorPlacementPoint.position,
            anchorPlacementPoint.rotation,
            "SharedObject_" + System.DateTime.Now.ToString("yyyyMMdd_HHmmss")
        );
    }

    private void OnClearAnchorsButtonClicked()
    {
        anchorManager.ClearAllAnchors();
        statusText.text = "All anchors cleared";
        progressSlider.gameObject.SetActive(false);
    }

    private void UpdateProgressBar(float progress)
    {
        progressSlider.value = progress;

        if (progress >= 1.0f)
        {
            // 完了したら少し待ってから非表示にする
            StartCoroutine(HideProgressBarAfterDelay(1.5f));
        }
    }

    private IEnumerator HideProgressBarAfterDelay(float delay)
    {
        yield return new WaitForSeconds(delay);
        progressSlider.gameObject.SetActive(false);
    }

    private void OnAnchorShared(string anchorUuid, bool success)
    {
        if (success)
        {
            statusText.text = "Anchor shared successfully";
        }
        else
        {
            statusText.text = "Failed to share anchor";
        }
    }
}
```

#### 5. アンカー共有状態の視覚化

共有されたアンカーの状態を視覚的に示すためのビジュアライザーを実装する:

```csharp
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AnchorVisualizer : MonoBehaviour
{
    [SerializeField] private Material sharedAnchorMaterial;
    [SerializeField] private Material localAnchorMaterial;
    [SerializeField] private float anchorSphereRadius = 0.05f;

    private Dictionary<string, GameObject> visualizers = new Dictionary<string, GameObject>();
    private SharedAnchorManager anchorManager;

    private void Start()
    {
        anchorManager = SharedAnchorManager.Instance;

        if (anchorManager == null)
        {
            Debug.LogError("SharedAnchorManager not found in scene");
            return;
        }

        // アンカー共有イベントのリスナーを設定
        anchorManager.OnAnchorShared += OnAnchorShared;
    }

    private void OnDestroy()
    {
        if (anchorManager != null)
        {
            anchorManager.OnAnchorShared -= OnAnchorShared;
        }
    }

    private void OnAnchorShared(string anchorUuid, bool success)
    {
        if (success)
        {
            // アンカーオブジェクトを取得
            GameObject anchoredObject = anchorManager.GetAnchoredObject(anchorUuid);

            if (anchoredObject != null && !visualizers.ContainsKey(anchorUuid))
            {
                // ビジュアライザーの作成
                GameObject visualizer = GameObject.CreatePrimitive(PrimitiveType.Sphere);
                visualizer.transform.localScale = Vector3.one * anchorSphereRadius * 2;
                visualizer.transform.parent = anchoredObject.transform;
                visualizer.transform.localPosition = Vector3.zero;

                // マテリアルの設定（共有アンカーか否かで色分け）
                Renderer renderer = visualizer.GetComponent<Renderer>();
                renderer.material = sharedAnchorMaterial;

                // 辞書に追加
                visualizers[anchorUuid] = visualizer;
            }
        }
    }

    // ビジュアライザーの表示/非表示を切り替える
    public void SetVisualizersVisible(bool visible)
    {
        foreach (GameObject visualizer in visualizers.Values)
        {
            visualizer.SetActive(visible);
        }
    }
}
```

#### 6. 使用例と統合

これらのスクリプトをまとめてシーンに配置し, 使用する方法:

1. NetworkManagerオブジェクトを作成し, NetworkManagerスクリプトをアタッチ
2. SharedAnchorManagerオブジェクトを作成し, 以下を設定:
   - SharedAnchorManagerスクリプトをアタッチ
   - PhotonViewコンポーネントを設定
   - アンカープレファブとオブジェクトプレファブを設定
3. UIキャンバスを作成し, 必要なUIコンポーネントを配置して, AnchorSharingUIスクリプトをアタッチ
4. アンカーの視覚化用にAnchorVisualizerオブジェクトを作成し, スクリプトをアタッチ

#### 7. ベストプラクティスとトラブルシューティング

Photonを使用したSpatial Anchor共有において注意すべき点:

1. **ネットワーク転送量の最適化**
   - アンカーのUUIDのみを送信し, 変換データは送信しない
   - 大量のアンカーを同時に共有しない

2. **信頼性確保**
   - RPCの信頼性設定をReliableにして, データ損失を防ぐ
   - アンカーロードの失敗に備えて再試行メカニズムを実装する

3. **エラー処理**
   - ネットワーク切断時の処理を実装
   - アンカーロード失敗時の適切なフォールバックメカニズムを用意

4. **一般的な問題と解決策**
   - アンカーがロードできない: 環境のテクスチャ不足や照明条件を確認
   - 位置のずれ: トラッキングの安定性を確認し, アンカー作成前のウォームアップ時間を設ける
   - 同期の遅延: ネットワーク接続とPhoton設定を確認

#### 8. 拡張の可能性

この基本システムは以下のように拡張できる:

1. **永続化システム**
   - アンカーUUIDをクラウドデータベースに保存
   - 次回セッション開始時に自動ロード

2. **権限管理**
   - ホストだけがアンカーを作成/削除できるモード
   - 参加者ごとに異なる権限設定

3. **アンカー検出と自動マッピング**
   - 既存アンカーの自動検出とマッピング
   - 複数アンカー間の関係性の計算

Photonを使用したこの実装により, 複数のMeta Questデバイス間でSpatial Anchorを効率的に共有し, 協調的なMRまたはVR体験を実現することができる.

## コロケーションディスカバリーによる空間共有

Meta XR SDKでは, コロケーションディスカバリー機能を使用して, 複数のユーザーが同じ物理空間を共有していることを検出し, 空間アンカーを共有することができる.

```csharp
using UnityEngine;
using Oculus.Platform;
using Oculus.Platform.Models;

public class ColocationManager : MonoBehaviour
{
    private void Start()
    {
        // Oculus Platformを初期化
        Core.Initialize();

        // コロケーションサブシステムを初期化
        GroupPresence.LaunchInvitePanel();
        Colocation.GetCurrentMapUuid().OnComplete(OnGetMapUuid);
    }

    private void OnGetMapUuid(Message<string> message)
    {
        if (message.IsError)
        {
            Debug.LogError("Failed to get map UUID: " + message.GetError().Message);
            return;
        }

        string mapUuid = message.Data;
        Debug.Log("Current map UUID: " + mapUuid);

        // マップUUIDを使用してコロケーションセッションを開始
        Colocation.RequestMapData(mapUuid).OnComplete(OnMapDataReceived);
    }

    private void OnMapDataReceived(Message message)
    {
        if (message.IsError)
        {
            Debug.LogError("Failed to receive map data: " + message.GetError().Message);
            return;
        }

        Debug.Log("Map data received successfully");

        // コロケーションセッションを開始
        Colocation.ShareMap().OnComplete(OnMapShared);
    }

    private void OnMapShared(Message message)
    {
        if (message.IsError)
        {
            Debug.LogError("Failed to share map: " + message.GetError().Message);
            return;
        }

        Debug.Log("Map shared successfully, colocation session active");

        // ここでSpatial Anchorの共有を開始できる
    }
}
```

## 実践的なユースケース

### 1. 家具配置アプリケーション

Spatial Anchorを使用することで, ユーザーは仮想の家具を現実の部屋の特定の位置に配置し, アプリを再起動しても同じ位置に表示されるようにすることができる. 実装例:

```csharp
public class FurniturePlacementApp : MonoBehaviour
{
    public GameObject[] furnitureModels;
    private GameObject currentSelectedFurniture;
    private OVRSpatialAnchor currentAnchor;

    // ユーザーが家具を選択
    public void SelectFurniture(int index)
    {
        if (currentSelectedFurniture != null)
        {
            Destroy(currentSelectedFurniture);
        }

        currentSelectedFurniture = Instantiate(furnitureModels[index], transform.position, transform.rotation);
    }

    // 選択した家具を配置
    public void PlaceFurniture(Transform placementPosition)
    {
        if (currentSelectedFurniture == null) return;

        GameObject anchorObject = new GameObject("FurnitureAnchor");
        anchorObject.transform.position = placementPosition.position;
        anchorObject.transform.rotation = placementPosition.rotation;

        currentAnchor = anchorObject.AddComponent<OVRSpatialAnchor>();
        currentSelectedFurniture.transform.parent = anchorObject.transform;

        // アンカーを保存
        currentAnchor.Save((anchor, success) =>
        {
            if (success)
            {
                // プレイヤープレフスにアンカーUUIDと家具タイプを保存
                PlayerPrefs.SetString("Furniture_" + anchor.Uuid.ToString(), currentSelectedFurniture.name);
                PlayerPrefs.Save();

                Debug.Log("Furniture placed and anchor saved");
            }
            else
            {
                Debug.LogError("Failed to save furniture anchor");
            }
        });

        currentSelectedFurniture = null;
    }
}
```

### 2. マルチユーザーコラボレーション

Spatial Anchorを使用して, 複数のユーザーが同じ物理空間で3Dモデルをコラボレーティブに編集することができる.

```csharp
public class CollaborationManager : MonoBehaviourPunCallbacks
{
    public GameObject projectModelPrefab;
    private OVRSpatialAnchor projectAnchor;
    private GameObject projectModel;

    public void InitializeProject(Transform location)
    {
        if (!PhotonNetwork.IsMasterClient) return;

        // プロジェクトのアンカーを作成
        GameObject anchorObject = new GameObject("ProjectAnchor");
        anchorObject.transform.position = location.position;
        anchorObject.transform.rotation = location.rotation;

        projectAnchor = anchorObject.AddComponent<OVRSpatialAnchor>();

        // アンカーを保存し, 共有する
        projectAnchor.Save((anchor, success) =>
        {
            if (success)
            {
                // プロジェクトモデルを作成
                projectModel = PhotonNetwork.Instantiate(projectModelPrefab.name, Vector3.zero, Quaternion.identity);
                projectModel.transform.parent = anchorObject.transform;

                // アンカーUUIDを他のユーザーと共有
                photonView.RPC("SetProjectAnchorUuid", RpcTarget.Others, anchor.Uuid.ToString());
            }
            else
            {
                Debug.LogError("Failed to create project anchor");
            }
        });
    }

    [PunRPC]
    private void SetProjectAnchorUuid(string anchorUuid)
    {
        System.Guid uuid = new System.Guid(anchorUuid);

        // 共有されたアンカーをロード
        OVRSpatialAnchor.LoadOptions options = new OVRSpatialAnchor.LoadOptions
        {
            Uuids = new System.Guid[] { uuid }
        };

        OVRSpatialAnchor.LoadUnboundAnchors(options, (anchors) =>
        {
            if (anchors.Length > 0)
            {
                Debug.Log("Project anchor loaded");
                projectAnchor = anchors[0];

                // アンカーが読み込まれたらプロジェクトモデルを検索して関連付け
                GameObject[] projectObjects = GameObject.FindGameObjectsWithTag("ProjectModel");
                if (projectObjects.Length > 0)
                {
                    projectModel = projectObjects[0];
                    projectModel.transform.parent = projectAnchor.transform;
                }
            }
        });
    }
}
```

## 注意点と最適化

### 1. アンカー作成時の環境条件

Spatial Anchorの作成時には以下の点に注意が必要である:

- 十分な照明がある環境で行う
- 特徴的なテクスチャや形状がある場所を選ぶ
- 平らな壁や単調な床などの特徴が少ない場所を避ける
- デバイスをゆっくり動かし, トラッキングが安定していることを確認する

### 2. パフォーマンス最適化

多数のSpatial Anchorを使用する場合は, 以下の最適化が重要である:

- 不要なアンカーはEraseメソッドで削除する
- アンカーのロード処理を分散させる（一度にすべてをロードしない）
- 視野外や遠距離のアンカーは必要に応じて無効化する
- アンカーオブジェクトの階層は浅く保つ

```csharp
// アンカーのロードを分散させる例
public class OptimizedAnchorLoader : MonoBehaviour
{
    private Queue<System.Guid> anchorQueue = new Queue<System.Guid>();
    private bool isProcessingQueue = false;

    public void LoadAnchors(System.Guid[] anchorUuids)
    {
        foreach (var uuid in anchorUuids)
        {
            anchorQueue.Enqueue(uuid);
        }

        if (!isProcessingQueue)
        {
            StartCoroutine(ProcessAnchorQueue());
        }
    }

    private IEnumerator ProcessAnchorQueue()
    {
        isProcessingQueue = true;

        while (anchorQueue.Count > 0)
        {
            // キューから5つずつアンカーUUIDを取り出す
            List<System.Guid> batchUuids = new List<System.Guid>();
            for (int i = 0; i < 5 && anchorQueue.Count > 0; i++)
            {
                batchUuids.Add(anchorQueue.Dequeue());
            }

            // バッチとしてアンカーをロード
            OVRSpatialAnchor.LoadOptions options = new OVRSpatialAnchor.LoadOptions
            {
                Uuids = batchUuids.ToArray()
            };

            OVRSpatialAnchor.LoadUnboundAnchors(options, null);

            // 次のバッチまで待機
            yield return new WaitForSeconds(0.5f);
        }

        isProcessingQueue = false;
    }
}
```

Spatial Anchorは, Meta Quest開発において非常に強力な機能であり, 現実世界と仮想世界を結びつける重要な役割を果たす. 適切に実装することで, 持続的な空間体験や複数ユーザー間での共有体験を実現できる. Meta XR SDKのOVRSpatialAnchorコンポーネントを使いこなすことで, より没入感のある空間体験を提供することが可能になる.

本記事で紹介した実装例をベースに, 独自のXRアプリケーションに空間アンカー機能を組み込んでみることをお勧めする. 環境条件やパフォーマンスに関する注意点に留意しながら, ユーザーにとって魅力的な空間体験を創り出していくことが重要である.

## (参考)
Meta XR SDK(V66-74)でQuestアプリを開発
https://www.docswell.com/s/Ovjang/ZP9V6X-MetaXRSDK66#p340
