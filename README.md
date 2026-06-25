# Photo Notes

一个纯静态的个人摄影展示页，包含首屏作品、精选照片、时间线、文字描述、拍摄信息、标签筛选和大图预览。

## 使用

直接打开 `index.html`，或用静态服务启动当前目录：

```bash
python3 -m http.server 4174
```

访问：

```text
http://127.0.0.1:4174
```

## 修改照片

照片数据在 `index.html` 底部的 `photos` 数组中。替换 `title`、`date`、`tag`、`location`、`camera`、`lens`、`description`、`src` 和 `alt` 即可。

`src` 可以是本地图片路径，也可以是远程图片 URL。

## 许可

MIT
