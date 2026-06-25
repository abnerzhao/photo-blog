# Photo Notes

一个纯静态的个人摄影时间线，参考 `photos.sambecker.com` 的轻量照片流形态。

## 使用

```bash
python3 -m http.server 4175
```

打开：

```text
http://127.0.0.1:4175
```

## 修改照片

照片数据在 `data.js` 的 `photoEntries` 中。`index.html` 是全局预览页，支持按年份、地点、相机筛选；`timeline.html` 是时间线页，每个时间点可以放多张照片，并共用标题、描述、地点和相机信息。

## 许可

MIT
