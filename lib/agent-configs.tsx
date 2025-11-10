import React from 'react';
import {
  AimOutlined,
  ThunderboltOutlined,
  BellOutlined,
  RocketOutlined,
  BugOutlined
} from '@ant-design/icons';

// 根因分析Agent配置
export const rootCauseAnalysisConfig = {
  id: 'root-cause-analysis',
  name: '根因分析Agent',
  title: "I'm Root Cause Agent",
  description: '我可以帮你分析用户之声、Crash排查、OOM分析等各类问题根因',
  icon: <AimOutlined />,
  gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  agents: [
    { id: 'root-cause', name: '根因分析' },
    { id: 'oom-analysis', name: 'OOM分析' },
    { id: 'crash-analysis', name: 'Crash分析' },
    { id: 'user-voice', name: '用户原声分析' }
  ],
  problemTypes: [
    {
      id: 'user_voice',
      name: '用户原声',
      cases: [
        {
          id: 'search_issues',
          title: '搜索功能异常',
          description: `用户反馈内容：
用户ID: u_123456789
反馈时间: 2024-11-10 14:23:15
设备信息: iPhone 14 Pro, iOS 17.2
App版本: 8.5.2

反馈内容：
"我最近用你们的搜索功能，发现几个问题：
1. 搜索商品的时候，明明有这个商品但就是搜不出来，比如我搜'iPhone 15'，结果列表里没有，但是我直接在分类里能找到这个商品。
2. 搜索速度特别慢，每次都要等3-5秒才有结果，有时候还会卡死，整个页面都动不了。
3. 搜索历史记录也不准确，显示的都是我之前没搜过的内容。
4. 有时候输入关键词后，点击搜索按钮没反应，需要退出重新进入才能用。

这个问题已经持续一周了，严重影响我的购物体验，希望能尽快修复。"`,
          fullContent: `用户反馈内容：
用户ID: u_123456789
反馈时间: 2024-11-10 14:23:15
设备信息: iPhone 14 Pro, iOS 17.2
App版本: 8.5.2

反馈内容：
"我最近用你们的搜索功能，发现几个问题：
1. 搜索商品的时候，明明有这个商品但就是搜不出来，比如我搜'iPhone 15'，结果列表里没有，但是我直接在分类里能找到这个商品。
2. 搜索速度特别慢，每次都要等3-5秒才有结果，有时候还会卡死，整个页面都动不了。
3. 搜索历史记录也不准确，显示的都是我之前没搜过的内容。
4. 有时候输入关键词后，点击搜索按钮没反应，需要退出重新进入才能用。

这个问题已经持续一周了，严重影响我的购物体验，希望能尽快修复。"`
        },
        {
          id: 'login_problems',
          title: '登录问题频发',
          description: `用户反馈内容：
用户ID: u_987654321
反馈时间: 2024-11-10 09:15:32
设备信息: Xiaomi 13, Android 14
App版本: 8.5.1

反馈内容：
"登录功能有严重问题，我已经反馈过好几次了：
1. 输入正确的账号密码，点击登录后一直转圈圈，等了一分钟还是没反应，最后提示'网络错误，请重试'。
2. 有时候登录成功了，但是一刷新页面又退出登录了，需要重新登录。
3. 使用微信登录的时候，授权后跳转回来，显示'登录失败，请稍后重试'，但是用手机号登录就没问题。
4. 登录状态经常丢失，用着用着就提示需要重新登录，非常影响使用。

这个问题从上周更新版本后就出现了，希望尽快解决。"`,
          fullContent: `用户反馈内容：
用户ID: u_987654321
反馈时间: 2024-11-10 09:15:32
设备信息: Xiaomi 13, Android 14
App版本: 8.5.1

反馈内容：
"登录功能有严重问题，我已经反馈过好几次了：
1. 输入正确的账号密码，点击登录后一直转圈圈，等了一分钟还是没反应，最后提示'网络错误，请重试'。
2. 有时候登录成功了，但是一刷新页面又退出登录了，需要重新登录。
3. 使用微信登录的时候，授权后跳转回来，显示'登录失败，请稍后重试'，但是用手机号登录就没问题。
4. 登录状态经常丢失，用着用着就提示需要重新登录，非常影响使用。

这个问题从上周更新版本后就出现了，希望尽快解决。"`
        },
        {
          id: 'payment_issues',
          title: '支付流程卡顿',
          description: `用户反馈内容：
用户ID: u_456789123
反馈时间: 2024-11-10 16:45:22
设备信息: Huawei P60 Pro, HarmonyOS 4.0
App版本: 8.5.2

反馈内容：
"支付功能太卡了，严重影响购物体验：
1. 点击'立即支付'按钮后，页面卡住不动，等了好久才跳转到支付页面，有时候要等10秒以上。
2. 选择支付方式后，点击确认支付，按钮变成灰色但是没有任何反应，需要重新进入订单页面才能支付。
3. 支付成功后，页面一直显示'支付处理中'，实际上已经扣款成功了，但是订单状态没有更新。
4. 使用支付宝支付的时候，跳转到支付宝App后，支付完成返回App，显示支付失败，但是支付宝已经扣款了。

这个问题导致我多次重复支付，希望尽快修复并处理我的重复订单问题。"`,
          fullContent: `用户反馈内容：
用户ID: u_456789123
反馈时间: 2024-11-10 16:45:22
设备信息: Huawei P60 Pro, HarmonyOS 4.0
App版本: 8.5.2

反馈内容：
"支付功能太卡了，严重影响购物体验：
1. 点击'立即支付'按钮后，页面卡住不动，等了好久才跳转到支付页面，有时候要等10秒以上。
2. 选择支付方式后，点击确认支付，按钮变成灰色但是没有任何反应，需要重新进入订单页面才能支付。
3. 支付成功后，页面一直显示'支付处理中'，实际上已经扣款成功了，但是订单状态没有更新。
4. 使用支付宝支付的时候，跳转到支付宝App后，支付完成返回App，显示支付失败，但是支付宝已经扣款了。

这个问题导致我多次重复支付，希望尽快修复并处理我的重复订单问题。"`
        }
      ]
    },
    {
      id: 'crash',
      name: 'Crash',
      cases: [
        {
          id: 'startup_crash',
          title: '应用启动崩溃',
          description: `Crash堆栈信息：
异常类型: java.lang.RuntimeException
异常信息: Unable to start activity ComponentInfo{com.xiaohongshu.app/com.xiaohongshu.app.main.MainActivity}: java.lang.NullPointerException
发生时间: 2024-11-10 08:15:23
设备信息: Xiaomi 13 Ultra, Android 14, 8GB RAM
App版本: 8.5.2
影响用户数: 1,234

完整堆栈：
java.lang.RuntimeException: Unable to start activity ComponentInfo{com.xiaohongshu.app/com.xiaohongshu.app.main.MainActivity}: java.lang.NullPointerException
    at android.app.ActivityThread.performLaunchActivity(ActivityThread.java:3449)
    at android.app.ActivityThread.handleLaunchActivity(ActivityThread.java:3601)
    at android.app.servertransaction.LaunchActivityItem.execute(LaunchActivityItem.java:85)
    at android.app.servertransaction.TransactionExecutor.executeCallbacks(TransactionExecutor.java:135)
    at android.app.servertransaction.TransactionExecutor.execute(TransactionExecutor.java:95)
    at android.app.ActivityThread$H.handleMessage(ActivityThread.java:2066)
    at android.os.Handler.dispatchMessage(Handler.java:106)
    at android.os.Looper.loop(Looper.java:223)
    at android.app.ActivityThread.main(ActivityThread.java:7656)
    at java.lang.reflect.Method.invoke(Native Method)
    at com.android.internal.os.RuntimeInit$MethodAndArgsCaller.run(RuntimeInit.java:592)
    at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:947)
Caused by: java.lang.NullPointerException
    at com.xiaohongshu.app.main.MainActivity.onCreate(MainActivity.java:156)
    at android.app.Activity.performCreate(Activity.java:8000)
    at android.app.Activity.performCreate(Activity.java:7984)
    at android.app.Instrumentation.callActivityOnCreate(Instrumentation.java:1309)
    at android.app.ActivityThread.performLaunchActivity(ActivityThread.java:3422)
    ... 11 more`,
          fullContent: `Crash堆栈信息：
异常类型: java.lang.RuntimeException
异常信息: Unable to start activity ComponentInfo{com.xiaohongshu.app/com.xiaohongshu.app.main.MainActivity}: java.lang.NullPointerException
发生时间: 2024-11-10 08:15:23
设备信息: Xiaomi 13 Ultra, Android 14, 8GB RAM
App版本: 8.5.2
影响用户数: 1,234

完整堆栈：
java.lang.RuntimeException: Unable to start activity ComponentInfo{com.xiaohongshu.app/com.xiaohongshu.app.main.MainActivity}: java.lang.NullPointerException
    at android.app.ActivityThread.performLaunchActivity(ActivityThread.java:3449)
    at android.app.ActivityThread.handleLaunchActivity(ActivityThread.java:3601)
    at android.app.servertransaction.LaunchActivityItem.execute(LaunchActivityItem.java:85)
    at android.app.servertransaction.TransactionExecutor.executeCallbacks(TransactionExecutor.java:135)
    at android.app.servertransaction.TransactionExecutor.execute(TransactionExecutor.java:95)
    at android.app.ActivityThread$H.handleMessage(ActivityThread.java:2066)
    at android.os.Handler.dispatchMessage(Handler.java:106)
    at android.os.Looper.loop(Looper.java:223)
    at android.app.ActivityThread.main(ActivityThread.java:7656)
    at java.lang.reflect.Method.invoke(Native Method)
    at com.android.internal.os.RuntimeInit$MethodAndArgsCaller.run(RuntimeInit.java:592)
    at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:947)
Caused by: java.lang.NullPointerException
    at com.xiaohongshu.app.main.MainActivity.onCreate(MainActivity.java:156)
    at android.app.Activity.performCreate(Activity.java:8000)
    at android.app.Activity.performCreate(Activity.java:7984)
    at android.app.Instrumentation.callActivityOnCreate(Instrumentation.java:1309)
    at android.app.ActivityThread.performLaunchActivity(ActivityThread.java:3422)
    ... 11 more`
        },
        {
          id: 'memory_crash',
          title: '内存溢出崩溃',
          description: `Crash堆栈信息：
异常类型: java.lang.OutOfMemoryError
异常信息: Failed to allocate a 4194316 byte allocation with 2097152 free bytes and 2MB until OOM
发生时间: 2024-11-10 12:30:45
设备信息: OPPO Find X6, Android 13, 12GB RAM
App版本: 8.5.2
影响用户数: 567

完整堆栈：
java.lang.OutOfMemoryError: Failed to allocate a 4194316 byte allocation with 2097152 free bytes and 2MB until OOM
    at dalvik.system.VMRuntime.newNonMovableArray(Native Method)
    at android.graphics.BitmapFactory.nativeDecodeByteArray(Native Method)
    at android.graphics.BitmapFactory.decodeByteArray(BitmapFactory.java:623)
    at android.graphics.BitmapFactory.decodeStream(BitmapFactory.java:878)
    at com.xiaohongshu.app.image.ImageLoader.loadBitmap(ImageLoader.java:234)
    at com.xiaohongshu.app.image.ImageLoader.loadImage(ImageLoader.java:156)
    at com.xiaohongshu.app.ui.ImageView.setImageResource(ImageView.java:89)
    at com.xiaohongshu.app.feed.FeedAdapter.onBindViewHolder(FeedAdapter.java:145)
    at androidx.recyclerview.widget.RecyclerView$Adapter.bindViewHolder(RecyclerView.java:7065)
    at androidx.recyclerview.widget.RecyclerView$Recycler.tryBindViewHolderByDeadline(RecyclerView.java:6015)
    at androidx.recyclerview.widget.RecyclerView$Recycler.tryGetViewHolderForPositionByDeadline(RecyclerView.java:6282)
    at androidx.recyclerview.widget.RecyclerView$Recycler.getViewForPosition(RecyclerView.java:6116)
    at androidx.recyclerview.widget.RecyclerView$Recycler.getViewForPosition(RecyclerView.java:6112)
    at androidx.recyclerview.widget.LinearLayoutManager$LayoutState.next(LinearLayoutManager.java:2303)
    at androidx.recyclerview.widget.LinearLayoutManager.layoutChunk(LinearLayoutManager.java:1627)
    at androidx.recyclerview.widget.LinearLayoutManager.fill(LinearLayoutManager.java:1587)
    at androidx.recyclerview.widget.LinearLayoutManager.onLayoutChildren(LinearLayoutManager.java:665)
    at androidx.recyclerview.widget.RecyclerView.dispatchLayoutStep2(RecyclerView.java:4134)
    at androidx.recyclerview.widget.RecyclerView.dispatchLayout(RecyclerView.java:3851)
    at androidx.recyclerview.widget.RecyclerView.onLayout(RecyclerView.java:4404)
    at android.view.View.layout(View.java:22093)
    at android.view.ViewGroup.layout(ViewGroup.java:6290)
    ... 25 more`,
          fullContent: `Crash堆栈信息：
异常类型: java.lang.OutOfMemoryError
异常信息: Failed to allocate a 4194316 byte allocation with 2097152 free bytes and 2MB until OOM
发生时间: 2024-11-10 12:30:45
设备信息: OPPO Find X6, Android 13, 12GB RAM
App版本: 8.5.2
影响用户数: 567

完整堆栈：
java.lang.OutOfMemoryError: Failed to allocate a 4194316 byte allocation with 2097152 free bytes and 2MB until OOM
    at dalvik.system.VMRuntime.newNonMovableArray(Native Method)
    at android.graphics.BitmapFactory.nativeDecodeByteArray(Native Method)
    at android.graphics.BitmapFactory.decodeByteArray(BitmapFactory.java:623)
    at android.graphics.BitmapFactory.decodeStream(BitmapFactory.java:878)
    at com.xiaohongshu.app.image.ImageLoader.loadBitmap(ImageLoader.java:234)
    at com.xiaohongshu.app.image.ImageLoader.loadImage(ImageLoader.java:156)
    at com.xiaohongshu.app.ui.ImageView.setImageResource(ImageView.java:89)
    at com.xiaohongshu.app.feed.FeedAdapter.onBindViewHolder(FeedAdapter.java:145)
    at androidx.recyclerview.widget.RecyclerView$Adapter.bindViewHolder(RecyclerView.java:7065)
    at androidx.recyclerview.widget.RecyclerView$Recycler.tryBindViewHolderByDeadline(RecyclerView.java:6015)
    at androidx.recyclerview.widget.RecyclerView$Recycler.tryGetViewHolderForPositionByDeadline(RecyclerView.java:6282)
    at androidx.recyclerview.widget.RecyclerView$Recycler.getViewForPosition(RecyclerView.java:6116)
    at androidx.recyclerview.widget.RecyclerView$Recycler.getViewForPosition(RecyclerView.java:6112)
    at androidx.recyclerview.widget.LinearLayoutManager$LayoutState.next(LinearLayoutManager.java:2303)
    at androidx.recyclerview.widget.LinearLayoutManager.layoutChunk(LinearLayoutManager.java:1627)
    at androidx.recyclerview.widget.LinearLayoutManager.fill(LinearLayoutManager.java:1587)
    at androidx.recyclerview.widget.LinearLayoutManager.onLayoutChildren(LinearLayoutManager.java:665)
    at androidx.recyclerview.widget.RecyclerView.dispatchLayoutStep2(RecyclerView.java:4134)
    at androidx.recyclerview.widget.RecyclerView.dispatchLayout(RecyclerView.java:3851)
    at androidx.recyclerview.widget.RecyclerView.onLayout(RecyclerView.java:4404)
    at android.view.View.layout(View.java:22093)
    at android.view.ViewGroup.layout(ViewGroup.java:6290)
    ... 25 more`
        },
        {
          id: 'network_crash',
          title: '网络请求崩溃',
          description: `Crash堆栈信息：
异常类型: java.net.SocketTimeoutException
异常信息: timeout
发生时间: 2024-11-10 15:22:18
设备信息: vivo X100 Pro, Android 14, 16GB RAM
App版本: 8.5.2
影响用户数: 890

完整堆栈：
java.net.SocketTimeoutException: timeout
    at okhttp3.internal.http2.Http2Stream.waitForIo(Http2Stream.java:600)
    at okhttp3.internal.http2.Http2Stream.takeHeaders(Http2Stream.java:149)
    at okhttp3.internal.http2.Http2Codec.readResponseHeaders(Http2Codec.java:128)
    at okhttp3.internal.http.CallServerInterceptor.intercept(CallServerInterceptor.java:88)
    at okhttp3.internal.http.RealInterceptorChain.proceed(RealInterceptorChain.java:147)
    at okhttp3.internal.http.RealInterceptorChain.proceed(RealInterceptorChain.java:121)
    at okhttp3.internal.cache.CacheInterceptor.intercept(CacheInterceptor.java:93)
    at okhttp3.internal.http.RealInterceptorChain.proceed(RealInterceptorChain.java:147)
    at okhttp3.internal.http.RealInterceptorChain.proceed(RealInterceptorChain.java:121)
    at okhttp3.internal.http.BridgeInterceptor.intercept(BridgeInterceptor.java:93)
    at okhttp3.internal.http.RealInterceptorChain.proceed(RealInterceptorChain.java:147)
    at okhttp3.internal.http.RetryAndFollowUpInterceptor.intercept(RetryAndFollowUpInterceptor.java:126)
    at okhttp3.internal.http.RealInterceptorChain.proceed(RealInterceptorChain.java:147)
    at okhttp3.internal.http.RealInterceptorChain.proceed(RealInterceptorChain.java:121)
    at okhttp3.RealCall.getResponseWithInterceptorChain(RealCall.java:254)
    at okhttp3.RealCall.execute(RealCall.java:92)
    at com.xiaohongshu.app.network.ApiClient.executeRequest(ApiClient.java:234)
    at com.xiaohongshu.app.network.ApiClient.get(ApiClient.java:156)
    at com.xiaohongshu.app.feed.FeedRepository.loadFeed(FeedRepository.java:89)
    at com.xiaohongshu.app.feed.FeedViewModel.loadData(FeedViewModel.java:145)
    at com.xiaohongshu.app.feed.FeedFragment.onViewCreated(FeedFragment.java:234)
    at androidx.fragment.app.Fragment.performViewCreated(Fragment.java:3019)
    at androidx.fragment.app.FragmentStateManager.createView(FragmentStateManager.java:551)
    at androidx.fragment.app.FragmentStateManager.moveToExpectedState(FragmentStateManager.java:261)
    ... 18 more`,
          fullContent: `Crash堆栈信息：
异常类型: java.net.SocketTimeoutException
异常信息: timeout
发生时间: 2024-11-10 15:22:18
设备信息: vivo X100 Pro, Android 14, 16GB RAM
App版本: 8.5.2
影响用户数: 890

完整堆栈：
java.net.SocketTimeoutException: timeout
    at okhttp3.internal.http2.Http2Stream.waitForIo(Http2Stream.java:600)
    at okhttp3.internal.http2.Http2Stream.takeHeaders(Http2Stream.java:149)
    at okhttp3.internal.http2.Http2Codec.readResponseHeaders(Http2Codec.java:128)
    at okhttp3.internal.http.CallServerInterceptor.intercept(CallServerInterceptor.java:88)
    at okhttp3.internal.http.RealInterceptorChain.proceed(RealInterceptorChain.java:147)
    at okhttp3.internal.http.RealInterceptorChain.proceed(RealInterceptorChain.java:121)
    at okhttp3.internal.cache.CacheInterceptor.intercept(CacheInterceptor.java:93)
    at okhttp3.internal.http.RealInterceptorChain.proceed(RealInterceptorChain.java:147)
    at okhttp3.internal.http.RealInterceptorChain.proceed(RealInterceptorChain.java:121)
    at okhttp3.internal.http.BridgeInterceptor.intercept(BridgeInterceptor.java:93)
    at okhttp3.internal.http.RealInterceptorChain.proceed(RealInterceptorChain.java:147)
    at okhttp3.internal.http.RetryAndFollowUpInterceptor.intercept(RetryAndFollowUpInterceptor.java:126)
    at okhttp3.internal.http.RealInterceptorChain.proceed(RealInterceptorChain.java:147)
    at okhttp3.internal.http.RealInterceptorChain.proceed(RealInterceptorChain.java:121)
    at okhttp3.RealCall.getResponseWithInterceptorChain(RealCall.java:254)
    at okhttp3.RealCall.execute(RealCall.java:92)
    at com.xiaohongshu.app.network.ApiClient.executeRequest(ApiClient.java:234)
    at com.xiaohongshu.app.network.ApiClient.get(ApiClient.java:156)
    at com.xiaohongshu.app.feed.FeedRepository.loadFeed(FeedRepository.java:89)
    at com.xiaohongshu.app.feed.FeedViewModel.loadData(FeedViewModel.java:145)
    at com.xiaohongshu.app.feed.FeedFragment.onViewCreated(FeedFragment.java:234)
    at androidx.fragment.app.Fragment.performViewCreated(Fragment.java:3019)
    at androidx.fragment.app.FragmentStateManager.createView(FragmentStateManager.java:551)
    at androidx.fragment.app.FragmentStateManager.moveToExpectedState(FragmentStateManager.java:261)
    ... 18 more`
        }
      ]
    },
    {
      id: 'oom',
      name: 'OOM',
      cases: [
        {
          id: 'image_oom',
          title: '图片加载OOM',
          description: `OOM堆栈信息：
异常类型: OutOfMemoryError
异常信息: Failed to allocate 16777216 bytes allocation with 4194304 free bytes
发生时间: 2024-11-10 11:20:33
设备信息: Redmi Note 12 Pro, Android 13, 6GB RAM
App版本: 8.5.2
影响用户数: 2,345
内存使用情况: 已使用 5.2GB / 6GB (86.7%)

完整堆栈：
OutOfMemoryError: Failed to allocate 16777216 bytes allocation with 4194304 free bytes and 2MB until OOM
    at dalvik.system.VMRuntime.newNonMovableArray(Native Method)
    at android.graphics.BitmapFactory.nativeDecodeAsset(Native Method)
    at android.graphics.BitmapFactory.decodeStream(BitmapFactory.java:878)
    at android.graphics.BitmapFactory.decodeResourceStream(BitmapFactory.java:695)
    at android.graphics.drawable.Drawable.createFromResourceStream(Drawable.java:1407)
    at android.content.res.Resources.loadDrawableForCookie(Resources.java:4150)
    at android.content.res.Resources.loadDrawable(Resources.java:4040)
    at android.content.res.Resources.getDrawable(Resources.java:2005)
    at android.content.Context.getDrawable(Context.java:925)
    at com.xiaohongshu.app.utils.ImageUtils.loadImage(ImageUtils.java:234)
    at com.xiaohongshu.app.utils.ImageUtils.loadImageFromUrl(ImageUtils.java:156)
    at com.xiaohongshu.app.ui.ImageView.loadImage(ImageView.java:89)
    at com.xiaohongshu.app.feed.FeedAdapter.onBindViewHolder(FeedAdapter.java:234)
    at androidx.recyclerview.widget.RecyclerView$Adapter.bindViewHolder(RecyclerView.java:7065)
    at androidx.recyclerview.widget.RecyclerView$Recycler.tryBindViewHolderByDeadline(RecyclerView.java:6015)
    at androidx.recyclerview.widget.RecyclerView$Recycler.getViewForPositionByDeadline(RecyclerView.java:6282)
    at androidx.recyclerview.widget.GapWorker.prefetchPositionWithDeadline(GapWorker.java:288)
    at androidx.recyclerview.widget.GapWorker.flushTaskWithDeadline(GapWorker.java:345)
    at androidx.recyclerview.widget.GapWorker.flush(GapWorker.java:361)
    at androidx.recyclerview.widget.GapWorker.prefetch(GapWorker.java:348)
    at androidx.recyclerview.widget.RecyclerView.dispatchLayoutStep2(RecyclerView.java:4134)
    at androidx.recyclerview.widget.RecyclerView.dispatchLayout(RecyclerView.java:3851)
    at androidx.recyclerview.widget.RecyclerView.onLayout(RecyclerView.java:4404)
    at android.view.View.layout(View.java:22093)
    at android.view.ViewGroup.layout(ViewGroup.java:6290)
    at android.widget.FrameLayout.layoutChildren(FrameLayout.java:332)
    at android.widget.FrameLayout.onLayout(FrameLayout.java:270)
    at android.view.View.layout(View.java:22093)
    at android.view.ViewGroup.layout(ViewGroup.java:6290)
    ... 32 more

内存分析：
- 堆内存使用: 4.8GB / 5.5GB (87.3%)
- 非堆内存使用: 420MB / 512MB (82.0%)
- 图片缓存占用: 1.2GB
- 对象实例数: 2,345,678`,
          fullContent: `OOM堆栈信息：
异常类型: OutOfMemoryError
异常信息: Failed to allocate 16777216 bytes allocation with 4194304 free bytes
发生时间: 2024-11-10 11:20:33
设备信息: Redmi Note 12 Pro, Android 13, 6GB RAM
App版本: 8.5.2
影响用户数: 2,345
内存使用情况: 已使用 5.2GB / 6GB (86.7%)

完整堆栈：
OutOfMemoryError: Failed to allocate 16777216 bytes allocation with 4194304 free bytes and 2MB until OOM
    at dalvik.system.VMRuntime.newNonMovableArray(Native Method)
    at android.graphics.BitmapFactory.nativeDecodeAsset(Native Method)
    at android.graphics.BitmapFactory.decodeStream(BitmapFactory.java:878)
    at android.graphics.BitmapFactory.decodeResourceStream(BitmapFactory.java:695)
    at android.graphics.drawable.Drawable.createFromResourceStream(Drawable.java:1407)
    at android.content.res.Resources.loadDrawableForCookie(Resources.java:4150)
    at android.content.res.Resources.loadDrawable(Resources.java:4040)
    at android.content.res.Resources.getDrawable(Resources.java:2005)
    at android.content.Context.getDrawable(Context.java:925)
    at com.xiaohongshu.app.utils.ImageUtils.loadImage(ImageUtils.java:234)
    at com.xiaohongshu.app.utils.ImageUtils.loadImageFromUrl(ImageUtils.java:156)
    at com.xiaohongshu.app.ui.ImageView.loadImage(ImageView.java:89)
    at com.xiaohongshu.app.feed.FeedAdapter.onBindViewHolder(FeedAdapter.java:234)
    at androidx.recyclerview.widget.RecyclerView$Adapter.bindViewHolder(RecyclerView.java:7065)
    at androidx.recyclerview.widget.RecyclerView$Recycler.tryBindViewHolderByDeadline(RecyclerView.java:6015)
    at androidx.recyclerview.widget.RecyclerView$Recycler.getViewForPositionByDeadline(RecyclerView.java:6282)
    at androidx.recyclerview.widget.GapWorker.prefetchPositionWithDeadline(GapWorker.java:288)
    at androidx.recyclerview.widget.GapWorker.flushTaskWithDeadline(GapWorker.java:345)
    at androidx.recyclerview.widget.GapWorker.flush(GapWorker.java:361)
    at androidx.recyclerview.widget.GapWorker.prefetch(GapWorker.java:348)
    at androidx.recyclerview.widget.RecyclerView.dispatchLayoutStep2(RecyclerView.java:4134)
    at androidx.recyclerview.widget.RecyclerView.dispatchLayout(RecyclerView.java:3851)
    at androidx.recyclerview.widget.RecyclerView.onLayout(RecyclerView.java:4404)
    at android.view.View.layout(View.java:22093)
    at android.view.ViewGroup.layout(ViewGroup.java:6290)
    at android.widget.FrameLayout.layoutChildren(FrameLayout.java:332)
    at android.widget.FrameLayout.onLayout(FrameLayout.java:270)
    at android.view.View.layout(View.java:22093)
    at android.view.ViewGroup.layout(ViewGroup.java:6290)
    ... 32 more

内存分析：
- 堆内存使用: 4.8GB / 5.5GB (87.3%)
- 非堆内存使用: 420MB / 512MB (82.0%)
- 图片缓存占用: 1.2GB
- 对象实例数: 2,345,678`
        },
        {
          id: 'list_oom',
          title: '列表滑动OOM',
          description: `OOM堆栈信息：
异常类型: OutOfMemoryError
异常信息: pthread_create (1040KB stack) failed: Try again
发生时间: 2024-11-10 13:45:12
设备信息: Honor 90, Android 13, 8GB RAM
App版本: 8.5.2
影响用户数: 1,567
内存使用情况: 已使用 7.1GB / 8GB (88.8%)

完整堆栈：
OutOfMemoryError: pthread_create (1040KB stack) failed: Try again
    at java.lang.Thread.nativeCreate(Native Method)
    at java.lang.Thread.start(Thread.java:733)
    at java.util.concurrent.ThreadPoolExecutor.addWorker(ThreadPoolExecutor.java:937)
    at java.util.concurrent.ThreadPoolExecutor.execute(ThreadPoolExecutor.java:1367)
    at androidx.recyclerview.widget.RecyclerView.scrollBy(RecyclerView.java:2345)
    at androidx.recyclerview.widget.RecyclerView$ViewFlinger.run(RecyclerView.java:5234)
    at android.view.Choreographer$CallbackRecord.run(Choreographer.java:1035)
    at android.view.Choreographer.doCallbacks(Choreographer.java:845)
    at android.view.Choreographer.doFrame(Choreographer.java:780)
    at android.view.Choreographer$FrameDisplayEventReceiver.run(Choreographer.java:1022)
    at android.os.Handler.handleCallback(Handler.java:938)
    at android.os.Handler.dispatchMessage(Handler.java:99)
    at android.os.Looper.loop(Looper.java:223)
    at android.app.ActivityThread.main(ActivityThread.java:7656)
    at java.lang.reflect.Method.invoke(Native Method)
    at com.android.internal.os.RuntimeInit$MethodAndArgsCaller.run(RuntimeInit.java:592)
    at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:947)

内存分析：
- 线程数: 156 (正常应 < 50)
- 线程栈总占用: 162MB
- RecyclerView缓存项数: 234
- 图片缓存占用: 2.1GB`,
          fullContent: `OOM堆栈信息：
异常类型: OutOfMemoryError
异常信息: pthread_create (1040KB stack) failed: Try again
发生时间: 2024-11-10 13:45:12
设备信息: Honor 90, Android 13, 8GB RAM
App版本: 8.5.2
影响用户数: 1,567
内存使用情况: 已使用 7.1GB / 8GB (88.8%)

完整堆栈：
OutOfMemoryError: pthread_create (1040KB stack) failed: Try again
    at java.lang.Thread.nativeCreate(Native Method)
    at java.lang.Thread.start(Thread.java:733)
    at java.util.concurrent.ThreadPoolExecutor.addWorker(ThreadPoolExecutor.java:937)
    at java.util.concurrent.ThreadPoolExecutor.execute(ThreadPoolExecutor.java:1367)
    at androidx.recyclerview.widget.RecyclerView.scrollBy(RecyclerView.java:2345)
    at androidx.recyclerview.widget.RecyclerView$ViewFlinger.run(RecyclerView.java:5234)
    at android.view.Choreographer$CallbackRecord.run(Choreographer.java:1035)
    at android.view.Choreographer.doCallbacks(Choreographer.java:845)
    at android.view.Choreographer.doFrame(Choreographer.java:780)
    at android.view.Choreographer$FrameDisplayEventReceiver.run(Choreographer.java:1022)
    at android.os.Handler.handleCallback(Handler.java:938)
    at android.os.Handler.dispatchMessage(Handler.java:99)
    at android.os.Looper.loop(Looper.java:223)
    at android.app.ActivityThread.main(ActivityThread.java:7656)
    at java.lang.reflect.Method.invoke(Native Method)
    at com.android.internal.os.RuntimeInit$MethodAndArgsCaller.run(RuntimeInit.java:592)
    at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:947)

内存分析：
- 线程数: 156 (正常应 < 50)
- 线程栈总占用: 162MB
- RecyclerView缓存项数: 234
- 图片缓存占用: 2.1GB`
        },
        {
          id: 'cache_oom',
          title: '缓存累积OOM',
          description: `OOM堆栈信息：
异常类型: OutOfMemoryError
异常信息: Java heap space
发生时间: 2024-11-10 10:15:28
设备信息: OnePlus 11, Android 14, 12GB RAM
App版本: 8.5.2
影响用户数: 3,456
内存使用情况: 已使用 10.8GB / 12GB (90.0%)

完整堆栈：
OutOfMemoryError: Java heap space
    at java.util.HashMap.resize(HashMap.java:703)
    at java.util.HashMap.putVal(HashMap.java:662)
    at java.util.HashMap.put(HashMap.java:611)
    at com.xiaohongshu.app.cache.MemoryCache.put(MemoryCache.java:234)
    at com.xiaohongshu.app.cache.MemoryCache.put(MemoryCache.java:189)
    at com.xiaohongshu.app.network.ResponseCache.cacheResponse(ResponseCache.java:156)
    at com.xiaohongshu.app.network.ApiClient.executeRequest(ApiClient.java:234)
    at com.xiaohongshu.app.network.ApiClient.get(ApiClient.java:156)
    at com.xiaohongshu.app.feed.FeedRepository.loadFeed(FeedRepository.java:89)
    at com.xiaohongshu.app.feed.FeedViewModel.loadData(FeedViewModel.java:145)
    at com.xiaohongshu.app.feed.FeedFragment.onViewCreated(FeedFragment.java:234)
    at androidx.fragment.app.Fragment.performViewCreated(Fragment.java:3019)
    at androidx.fragment.app.FragmentStateManager.createView(FragmentStateManager.java:551)
    at androidx.fragment.app.FragmentStateManager.moveToExpectedState(FragmentStateManager.java:261)
    at androidx.fragment.app.FragmentManager.moveToState(FragmentManager.java:1327)
    at androidx.fragment.app.FragmentManager.dispatchStateChange(FragmentManager.java:3011)
    at androidx.fragment.app.FragmentManager.dispatchActivityCreated(FragmentManager.java:2964)
    at androidx.fragment.app.Fragment.performActivityCreated(Fragment.java:3019)
    at androidx.fragment.app.FragmentStateManager.activityCreated(FragmentStateManager.java:577)
    at androidx.fragment.app.FragmentManager.moveToState(FragmentManager.java:1327)
    at androidx.fragment.app.FragmentManager.addAddedFragments(FragmentManager.java:2624)
    at androidx.fragment.app.FragmentManager.executeOpsTogether(FragmentManager.java:2401)
    at androidx.fragment.app.FragmentManager.removeRedundantOperationsAndExecute(FragmentManager.java:2356)
    at androidx.fragment.app.FragmentManager.execPendingActions(FragmentManager.java:2273)
    at androidx.fragment.app.FragmentManager$4.run(FragmentManager.java:415)
    at android.os.Handler.handleCallback(Handler.java:938)
    at android.os.Handler.dispatchMessage(Handler.java:99)
    at android.os.Looper.loop(Looper.java:223)
    at android.app.ActivityThread.main(ActivityThread.java:7656)
    at java.lang.reflect.Method.invoke(Native Method)
    at com.android.internal.os.RuntimeInit$MethodAndArgsCaller.run(RuntimeInit.java:592)
    at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:947)

内存分析：
- 堆内存使用: 9.8GB / 10.5GB (93.3%)
- 缓存项数量: 45,678
- 缓存总大小: 3.2GB
- HashMap桶数量: 65,536
- 平均缓存项大小: 72KB`,
          fullContent: `OOM堆栈信息：
异常类型: OutOfMemoryError
异常信息: Java heap space
发生时间: 2024-11-10 10:15:28
设备信息: OnePlus 11, Android 14, 12GB RAM
App版本: 8.5.2
影响用户数: 3,456
内存使用情况: 已使用 10.8GB / 12GB (90.0%)

完整堆栈：
OutOfMemoryError: Java heap space
    at java.util.HashMap.resize(HashMap.java:703)
    at java.util.HashMap.putVal(HashMap.java:662)
    at java.util.HashMap.put(HashMap.java:611)
    at com.xiaohongshu.app.cache.MemoryCache.put(MemoryCache.java:234)
    at com.xiaohongshu.app.cache.MemoryCache.put(MemoryCache.java:189)
    at com.xiaohongshu.app.network.ResponseCache.cacheResponse(ResponseCache.java:156)
    at com.xiaohongshu.app.network.ApiClient.executeRequest(ApiClient.java:234)
    at com.xiaohongshu.app.network.ApiClient.get(ApiClient.java:156)
    at com.xiaohongshu.app.feed.FeedRepository.loadFeed(FeedRepository.java:89)
    at com.xiaohongshu.app.feed.FeedViewModel.loadData(FeedViewModel.java:145)
    at com.xiaohongshu.app.feed.FeedFragment.onViewCreated(FeedFragment.java:234)
    at androidx.fragment.app.Fragment.performViewCreated(Fragment.java:3019)
    at androidx.fragment.app.FragmentStateManager.createView(FragmentStateManager.java:551)
    at androidx.fragment.app.FragmentStateManager.moveToExpectedState(FragmentStateManager.java:261)
    at androidx.fragment.app.FragmentManager.moveToState(FragmentManager.java:1327)
    at androidx.fragment.app.FragmentManager.dispatchStateChange(FragmentManager.java:3011)
    at androidx.fragment.app.FragmentManager.dispatchActivityCreated(FragmentManager.java:2964)
    at androidx.fragment.app.Fragment.performActivityCreated(Fragment.java:3019)
    at androidx.fragment.app.FragmentStateManager.activityCreated(FragmentStateManager.java:577)
    at androidx.fragment.app.FragmentManager.moveToState(FragmentManager.java:1327)
    at androidx.fragment.app.FragmentManager.addAddedFragments(FragmentManager.java:2624)
    at androidx.fragment.app.FragmentManager.executeOpsTogether(FragmentManager.java:2401)
    at androidx.fragment.app.FragmentManager.removeRedundantOperationsAndExecute(FragmentManager.java:2356)
    at androidx.fragment.app.FragmentManager.execPendingActions(FragmentManager.java:2273)
    at androidx.fragment.app.FragmentManager$4.run(FragmentManager.java:415)
    at android.os.Handler.handleCallback(Handler.java:938)
    at android.os.Handler.dispatchMessage(Handler.java:99)
    at android.os.Looper.loop(Looper.java:223)
    at android.app.ActivityThread.main(ActivityThread.java:7656)
    at java.lang.reflect.Method.invoke(Native Method)
    at com.android.internal.os.RuntimeInit$MethodAndArgsCaller.run(RuntimeInit.java:592)
    at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:947)

内存分析：
- 堆内存使用: 9.8GB / 10.5GB (93.3%)
- 缓存项数量: 45,678
- 缓存总大小: 3.2GB
- HashMap桶数量: 65,536
- 平均缓存项大小: 72KB`
        }
      ]
    }
  ],
  analysisSteps: [
    { title: '问题识别', description: '分析问题的类型和特征' },
    { title: '数据收集', description: '收集相关的日志和数据' },
    { title: '模式分析', description: '识别问题中的模式和规律' },
    { title: '根因推断', description: '基于分析结果推断根本原因' },
    { title: '解决方案', description: '提供针对性的解决建议' }
  ],
  capabilities: [
    {
      id: 'clustering',
      name: '聚类分析',
      description: '对相似问题进行聚类，发现共同特征和模式'
    },
    {
      id: 'change',
      name: '变更分析',
      description: '分析最近的代码变更和配置变更对问题的影响'
    },
    {
      id: 'log',
      name: '日志分析',
      description: '深入分析系统日志，提取关键错误信息'
    },
    {
      id: 'code',
      name: '代码分析',
      description: '检查相关代码逻辑，发现潜在的代码问题'
    }
  ]
};

// 热修Agent配置
export const hotfixAgentConfig = {
  id: 'hotfix-agent',
  name: '热修Agent',
  title: "I'm Hotfix Agent",
  description: '我可以帮你快速分析线上问题，生成热修复方案，确保系统稳定运行',
  icon: <ThunderboltOutlined />,
  gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
  agents: [
    { id: 'hotfix', name: '热修复' },
    { id: 'emergency', name: '紧急修复' },
    { id: 'rollback', name: '回滚分析' }
  ],
  problemTypes: [
    {
      id: 'critical',
      name: '紧急问题',
      cases: [
        {
          id: 'service_down',
          title: '服务完全不可用',
          description: '核心服务出现故障，用户无法正常使用，需要立即修复。错误率达到100%，影响所有用户。'
        },
        {
          id: 'data_corruption',
          title: '数据损坏问题',
          description: '数据库出现数据损坏，部分用户数据丢失或错误，需要紧急修复和数据恢复。'
        },
        {
          id: 'security_breach',
          title: '安全漏洞',
          description: '发现严重安全漏洞，可能导致用户信息泄露，需要立即修复并加强安全措施。'
        }
      ]
    },
    {
      id: 'performance',
      name: '性能问题',
      cases: [
        {
          id: 'slow_response',
          title: '响应时间过长',
          description: 'API响应时间从平均200ms增加到5秒以上，严重影响用户体验，需要快速优化。'
        },
        {
          id: 'memory_leak',
          title: '内存泄漏',
          description: '应用内存使用持续增长，导致系统变慢甚至崩溃，需要找到泄漏点并修复。'
        },
        {
          id: 'high_cpu',
          title: 'CPU使用率过高',
          description: 'CPU使用率持续在90%以上，系统响应缓慢，需要优化算法或代码逻辑。'
        }
      ]
    },
    {
      id: 'functional',
      name: '功能异常',
      cases: [
        {
          id: 'feature_broken',
          title: '核心功能失效',
          description: '用户登录、支付等核心功能出现异常，部分用户无法正常使用，需要快速修复。'
        },
        {
          id: 'ui_error',
          title: '界面显示错误',
          description: '页面显示异常，按钮无法点击，图片无法加载，影响用户操作体验。'
        },
        {
          id: 'integration_failure',
          title: '第三方集成失败',
          description: '与第三方服务的集成出现问题，导致相关功能无法正常工作。'
        }
      ]
    }
  ],
  analysisSteps: [
    { title: '问题识别', description: '快速识别问题类型和影响范围' },
    { title: '影响评估', description: '评估问题对用户和业务的影响' },
    { title: '热修方案', description: '生成最优的热修复解决方案' },
    { title: '风险评估', description: '评估热修复的风险和副作用' },
    { title: '部署建议', description: '制定安全的部署和回滚策略' }
  ],
  capabilities: [
    {
      id: 'impact',
      name: '影响分析',
      description: '快速评估问题的影响范围和严重程度'
    },
    {
      id: 'solution',
      name: '方案生成',
      description: '基于问题特征生成最优的热修复方案'
    },
    {
      id: 'risk',
      name: '风险评估',
      description: '评估热修复方案的风险和可能的副作用'
    },
    {
      id: 'deployment',
      name: '部署策略',
      description: '制定安全的部署流程和回滚预案'
    }
  ]
};

// 告警分析Agent配置
export const alertAnalysisConfig = {
  id: 'alert-analysis',
  name: '告警分析Agent',
  title: "I'm Alert Analysis Agent",
  description: '我可以帮你智能分析系统告警，识别异常模式，快速定位根因并提供处理建议',
  icon: <BellOutlined />,
  gradient: 'linear-gradient(135deg, #fa8c16 0%, #faad14 100%)',
  agents: [
    { id: 'alert-analysis', name: '告警分析' },
    { id: 'anomaly-detection', name: '异常检测' },
    { id: 'pattern-recognition', name: '模式识别' }
  ],
  problemTypes: [
    {
      id: 'application',
      name: '应用告警',
      cases: [
        {
          id: 'search_success_rate',
          title: '搜索接口成功率降低到95%',
          description: `告警信息：
告警类型: 接口成功率告警
告警时间: 2024-11-10 14:30:00
接口名称: /api/v1/search
当前成功率: 95.0%
历史成功率: 99.2%
下降幅度: 4.2%
影响用户数: 约12,345人
告警级别: 中

详细数据：
- 最近1小时成功率: 95.0%
- 最近24小时成功率: 97.8%
- 最近7天成功率: 99.1%
- 错误类型分布:
  * 5xx错误: 2.1%
  * 4xx错误: 2.9%
  * 超时错误: 0.8%
- 主要错误码:
  * 500: 1,234次
  * 503: 567次
  * 408: 345次

时间趋势：
14:00 - 14:15: 成功率 99.1%
14:15 - 14:30: 成功率 95.0% (开始下降)
14:30 - 14:45: 成功率 94.8% (持续下降)

可能原因：
1. 后端服务异常
2. 数据库查询性能下降
3. 缓存失效
4. 流量突增导致服务过载`,
          fullContent: `告警信息：
告警类型: 接口成功率告警
告警时间: 2024-11-10 14:30:00
接口名称: /api/v1/search
当前成功率: 95.0%
历史成功率: 99.2%
下降幅度: 4.2%
影响用户数: 约12,345人
告警级别: 中

详细数据：
- 最近1小时成功率: 95.0%
- 最近24小时成功率: 97.8%
- 最近7天成功率: 99.1%
- 错误类型分布:
  * 5xx错误: 2.1%
  * 4xx错误: 2.9%
  * 超时错误: 0.8%
- 主要错误码:
  * 500: 1,234次
  * 503: 567次
  * 408: 345次

时间趋势：
14:00 - 14:15: 成功率 99.1%
14:15 - 14:30: 成功率 95.0% (开始下降)
14:30 - 14:45: 成功率 94.8% (持续下降)

可能原因：
1. 后端服务异常
2. 数据库查询性能下降
3. 缓存失效
4. 流量突增导致服务过载`
        },
        {
          id: 'homepage_latency',
          title: '首页接口耗时上涨20%',
          description: `告警信息：
告警类型: 接口耗时告警
告警时间: 2024-11-10 15:20:00
接口名称: /api/v1/homepage
当前平均耗时: 360ms
历史平均耗时: 300ms
上涨幅度: 20.0%
P95耗时: 850ms (历史: 650ms)
P99耗时: 1,200ms (历史: 900ms)
影响用户数: 约45,678人
告警级别: 中

详细数据：
- 最近1小时平均耗时: 360ms
- 最近24小时平均耗时: 320ms
- 最近7天平均耗时: 295ms
- 耗时分布:
  * P50: 280ms
  * P75: 420ms
  * P95: 850ms
  * P99: 1,200ms
- 慢查询占比: 8.5% (历史: 3.2%)

时间趋势：
15:00 - 15:10: 平均耗时 305ms
15:10 - 15:20: 平均耗时 360ms (开始上涨)
15:20 - 15:30: 平均耗时 375ms (持续上涨)

性能分析：
- 数据库查询耗时: 180ms (历史: 120ms) ↑50%
- 缓存命中率: 85% (历史: 92%) ↓7%
- 外部API调用耗时: 120ms (历史: 100ms) ↑20%
- 业务逻辑处理耗时: 60ms (历史: 80ms) ↓25%

可能原因：
1. 数据库查询性能下降
2. 缓存命中率降低
3. 外部依赖服务响应变慢
4. 接口逻辑变更导致性能下降`,
          fullContent: `告警信息：
告警类型: 接口耗时告警
告警时间: 2024-11-10 15:20:00
接口名称: /api/v1/homepage
当前平均耗时: 360ms
历史平均耗时: 300ms
上涨幅度: 20.0%
P95耗时: 850ms (历史: 650ms)
P99耗时: 1,200ms (历史: 900ms)
影响用户数: 约45,678人
告警级别: 中

详细数据：
- 最近1小时平均耗时: 360ms
- 最近24小时平均耗时: 320ms
- 最近7天平均耗时: 295ms
- 耗时分布:
  * P50: 280ms
  * P75: 420ms
  * P95: 850ms
  * P99: 1,200ms
- 慢查询占比: 8.5% (历史: 3.2%)

时间趋势：
15:00 - 15:10: 平均耗时 305ms
15:10 - 15:20: 平均耗时 360ms (开始上涨)
15:20 - 15:30: 平均耗时 375ms (持续上涨)

性能分析：
- 数据库查询耗时: 180ms (历史: 120ms) ↑50%
- 缓存命中率: 85% (历史: 92%) ↓7%
- 外部API调用耗时: 120ms (历史: 100ms) ↑20%
- 业务逻辑处理耗时: 60ms (历史: 80ms) ↓25%

可能原因：
1. 数据库查询性能下降
2. 缓存命中率降低
3. 外部依赖服务响应变慢
4. 接口逻辑变更导致性能下降`
        },
        {
          id: 'note_exposure_drop',
          title: '笔详曝光埋点环比减低15%',
          description: `告警信息：
告警类型: 埋点数据异常告警
告警时间: 2024-11-10 16:00:00
埋点名称: note_detail_exposure
当前曝光量: 850,000次/日
历史曝光量: 1,000,000次/日
环比下降: 15.0%
同比变化: -12.5%
告警级别: 中

详细数据：
- 今日曝光量: 850,000次
- 昨日曝光量: 980,000次
- 上周同期: 1,000,000次
- 上月同期: 970,000次
- 下降趋势:
  * 11-08: 1,020,000次
  * 11-09: 980,000次 ↓3.9%
  * 11-10: 850,000次 ↓13.3%

时间分布：
00:00 - 06:00: 120,000次 (历史: 140,000次) ↓14.3%
06:00 - 12:00: 280,000次 (历史: 320,000次) ↓12.5%
12:00 - 18:00: 280,000次 (历史: 340,000次) ↓17.6%
18:00 - 24:00: 170,000次 (历史: 200,000次) ↓15.0%

关联指标：
- 笔记详情页PV: 850,000 (历史: 1,000,000) ↓15%
- 笔记详情页UV: 420,000 (历史: 480,000) ↓12.5%
- 笔记点击率: 2.1% (历史: 2.3%) ↓8.7%
- 首页笔记曝光: 5,200,000 (历史: 5,800,000) ↓10.3%

可能原因：
1. 首页推荐算法调整
2. 用户行为变化
3. 埋点上报异常
4. 页面加载性能问题导致曝光统计不准确`,
          fullContent: `告警信息：
告警类型: 埋点数据异常告警
告警时间: 2024-11-10 16:00:00
埋点名称: note_detail_exposure
当前曝光量: 850,000次/日
历史曝光量: 1,000,000次/日
环比下降: 15.0%
同比变化: -12.5%
告警级别: 中

详细数据：
- 今日曝光量: 850,000次
- 昨日曝光量: 980,000次
- 上周同期: 1,000,000次
- 上月同期: 970,000次
- 下降趋势:
  * 11-08: 1,020,000次
  * 11-09: 980,000次 ↓3.9%
  * 11-10: 850,000次 ↓13.3%

时间分布：
00:00 - 06:00: 120,000次 (历史: 140,000次) ↓14.3%
06:00 - 12:00: 280,000次 (历史: 320,000次) ↓12.5%
12:00 - 18:00: 280,000次 (历史: 340,000次) ↓17.6%
18:00 - 24:00: 170,000次 (历史: 200,000次) ↓15.0%

关联指标：
- 笔记详情页PV: 850,000 (历史: 1,000,000) ↓15%
- 笔记详情页UV: 420,000 (历史: 480,000) ↓12.5%
- 笔记点击率: 2.1% (历史: 2.3%) ↓8.7%
- 首页笔记曝光: 5,200,000 (历史: 5,800,000) ↓10.3%

可能原因：
1. 首页推荐算法调整
2. 用户行为变化
3. 埋点上报异常
4. 页面加载性能问题导致曝光统计不准确`
        }
      ]
    }
  ],
  analysisSteps: [
    { title: '告警收集', description: '从监控系统收集相关告警数据' },
    { title: '模式识别', description: '识别告警中的异常模式和趋势' },
    { title: '关联分析', description: '分析告警之间的关联关系' },
    { title: '根因推断', description: '基于数据推断问题根本原因' },
    { title: '处理建议', description: '生成智能化的处理建议' }
  ],
  capabilities: [
    {
      id: 'collection',
      name: '告警收集',
      description: '智能收集和整理各类系统告警信息'
    },
    {
      id: 'pattern',
      name: '模式识别',
      description: '识别告警中的异常模式和发展趋势'
    },
    {
      id: 'correlation',
      name: '关联分析',
      description: '分析不同告警之间的关联关系'
    },
    {
      id: 'recommendation',
      name: '处理建议',
      description: '基于分析结果提供智能处理建议'
    }
  ]
};

// 首帧优化Agent配置
export const firstFrameOptimizationConfig = {
  id: 'first-frame-optimization',
  name: '首帧优化Agent',
  title: "I'm First Frame Optimization Agent",
  description: '我可以帮你分析和优化应用首帧渲染性能，提升用户体验',
  icon: <RocketOutlined />,
  gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  agents: [
    { id: 'first-frame', name: '首帧优化' },
    { id: 'performance', name: '性能分析' },
    { id: 'rendering', name: '渲染优化' }
  ],
  problemTypes: [
    {
      id: 'loading',
      name: '加载性能',
      cases: [
        {
          id: 'slow_startup',
          title: '应用启动缓慢',
          description: '应用从点击图标到首屏显示需要5秒以上，用户体验差，需要优化启动流程和资源加载。'
        },
        {
          id: 'large_bundle',
          title: '资源包过大',
          description: 'JavaScript bundle大小超过2MB，导致下载和解析时间过长，影响首屏渲染速度。'
        },
        {
          id: 'blocking_resources',
          title: '阻塞资源过多',
          description: '首屏渲染被大量CSS和JS资源阻塞，需要优化资源加载策略和优先级。'
        }
      ]
    },
    {
      id: 'rendering',
      name: '渲染性能',
      cases: [
        {
          id: 'layout_thrashing',
          title: '布局抖动',
          description: '页面渲染过程中出现多次重排重绘，导致首屏显示不稳定，影响用户体验。'
        },
        {
          id: 'image_optimization',
          title: '图片加载优化',
          description: '首屏图片过大或格式不当，导致加载缓慢，需要优化图片压缩和格式选择。'
        },
        {
          id: 'font_loading',
          title: '字体加载问题',
          description: '自定义字体加载导致文字闪烁或延迟显示，影响首屏渲染体验。'
        }
      ]
    },
    {
      id: 'optimization',
      name: '优化策略',
      cases: [
        {
          id: 'code_splitting',
          title: '代码分割优化',
          description: '需要实现更精细的代码分割策略，减少首屏加载的代码量，提升加载速度。'
        },
        {
          id: 'preloading',
          title: '预加载策略',
          description: '优化关键资源的预加载策略，确保首屏渲染所需资源优先加载。'
        },
        {
          id: 'caching',
          title: '缓存策略优化',
          description: '优化静态资源缓存策略，减少重复加载，提升再次访问的首屏速度。'
        }
      ]
    }
  ],
  analysisSteps: [
    { title: '性能检测', description: '检测当前首帧渲染性能指标' },
    { title: '瓶颈识别', description: '识别影响首帧性能的关键瓶颈' },
    { title: '资源分析', description: '分析资源加载和渲染流程' },
    { title: '优化方案', description: '生成针对性的优化建议' },
    { title: '效果预估', description: '预估优化后的性能提升效果' }
  ],
  capabilities: [
    {
      id: 'detection',
      name: '性能检测',
      description: '全面检测首帧渲染的各项性能指标'
    },
    {
      id: 'bottleneck',
      name: '瓶颈分析',
      description: '精准识别影响首帧性能的关键瓶颈'
    },
    {
      id: 'resource',
      name: '资源优化',
      description: '分析和优化资源加载策略'
    },
    {
      id: 'rendering',
      name: '渲染优化',
      description: '优化页面渲染流程和策略'
    }
  ]
};

// 导出所有配置
export const agentConfigs = {
  'root-cause-analysis': rootCauseAnalysisConfig,
  'hotfix-agent': hotfixAgentConfig,
  'alert-analysis': alertAnalysisConfig,
  'first-frame-optimization': firstFrameOptimizationConfig
};
