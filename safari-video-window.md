# window 平台上safari不支持video
```javascript
!!(document.createElement("video").canPlayType);  // false(safari/win)
```