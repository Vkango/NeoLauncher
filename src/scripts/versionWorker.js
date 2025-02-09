// versionWorker.js
self.onmessage = async (event) => {
    const { responseData, currentTabID, currentSelected, types } = event.data;
    try {
      if (currentSelected == 1 || currentSelected == 2) {
        const response = responseData;

        const data = await JSON.parse(response);
        if (!data) {
          throw new Error('Network response was not ok');
        }
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
            else if (currentTabID == 2) {
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
            }
            else if (currentTabID == 3) {
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

      }
      else {
        const response = responseData;
        const data = await JSON.parse(response);
        data.reverse();
        if (!data) {
          throw new Error('Network response was not ok');
        }
        const releases = data.filter(version => version[2] === currentTabID);
        const groupedItems = [];
        const groupedMap = {};  
        var lastMajorVersion;
        // 问题 向DOM添加过多元素导致的卡死造成
        // 异步处理数据，分批发
        const processReleases = async (releases) => {
          for (const release of releases) {
            await new Promise((resolve) => setTimeout(resolve, 0));
            const majorVersion = release[0].split('.')[0] + '.' + release[0].split('.')[1] + '.x';
            if (!groupedMap[majorVersion]) {
              groupedMap[majorVersion] = {
                id: groupedItems.length,
                clickable: false,
                name: majorVersion,
                tags: ['🚀 ' + release[0]],
              };
              console.log(groupedMap[majorVersion])
              groupedItems.push(groupedMap[majorVersion]);
            }
            groupedItems.push({
              id: release[1],
              clickable: true,
              name: release[0],
              icon: 'minecraft.png',
              url: release.url,
              tags: ['🎲 基岩版']
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
      }
    } catch (error) {
      self.postMessage({ error: error.message });
    }
  };