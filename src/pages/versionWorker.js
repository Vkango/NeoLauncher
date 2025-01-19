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
      releases.forEach((release, index) => {
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
          id: groupedItems.length,
          clickable: true,
          name: release.id,
          icon: 'minecraft.png',
          tags: ['🕖 ' + release.releaseTime.split("T")[0].replace("-", "/").replace("-", "/")]
        });
      });
      self.postMessage({ items: groupedItems });
    } catch (error) {
      self.postMessage({ error: error.message });
    }
  };