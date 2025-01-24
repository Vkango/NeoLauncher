// versionWorker.js
self.onmessage = async (event) => {
    const { currentTabID, types } = event.data;
    try {
      const response = await fetch('https://piston-meta.mojang.com/mc/game/version_manifest.json');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const releases = data.versions.filter(version => version.type === types[currentTabID]);
      const groupedItems = [];
      const groupedMap = {};
      var lastMajorVersion;
      // 问题 向DOM添加过多元素导致的卡死造成
      // 异步处理数据，分批发送
      const processReleases = async (releases) => {
        for (const release of releases) {
          await new Promise((resolve) => setTimeout(resolve, 0)); // 让出主线程不然卡死DOM
  
          if (currentTabID == 0) {
            const majorVersion = release.id.split('.')[0] + '.' + release.id.split('.')[1] + '.x';
            if (!groupedMap[majorVersion]) {
              groupedMap[majorVersion] = {
                id: groupedItems.length,
                clickable: false,
                name: majorVersion,
                tags: ['🚀 ' + release.id],
              };
              groupedItems.push(groupedMap[majorVersion]);
            }
          } else if (currentTabID == 1) {
            let majorVersion = "";
            if (release.id.includes("w")) {
              majorVersion = release.id.split('w')[0] + 'w 阶段快照';
            } else if (release.id.includes("-")) {
              majorVersion = release.id.split('-')[0] + ' 阶段快照';
            }
            if (!groupedMap[majorVersion] || majorVersion != lastMajorVersion) {
                groupedMap[majorVersion] = {
                    id: groupedItems.length,
                    clickable: false,
                    name: majorVersion,
                    tags: ['🚀 ' + release.id],
                };
              groupedItems.push(groupedMap[majorVersion]);
              lastMajorVersion = majorVersion
            }
          }
          groupedItems.push({
            id: release.id,
            clickable: true,
            name: release.id,
            icon: 'minecraft.png',
            url: release.url,
            tags: ['🕖 ' + release.releaseTime.split("T")[0].replace("-", "/").replace("-", "/")]
          });
          if (groupedItems.length % 100 === 0) {
            self.postMessage({ items: groupedItems }); // 消息通讯  
          }
        }
        if (groupedItems.length > 0) {
          self.postMessage({ items: groupedItems });
        }
      };
  
      await processReleases(releases);
    } catch (error) {
      self.postMessage({ error: error.message });
    }
  };