// modListWorker.js
self.onmessage = async (event) => {
    const { currentTabID, types } = event.data; // 以后用
    try {
      const response = await fetch('https://api.modrinth.com/v2/search?limit=20&index=relevance&facets=%5B%5B%22project_type%3Aresourcepack%22%5D%5D');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      let Items = [];
      let background_image_ = "";
      // 问题 向DOM添加过多元素导致的卡死造成
      // 异步处理数据，分批发送
      const processModList = async (releases) => {
        for (const release of releases) {
          await new Promise((resolve) => setTimeout(resolve, 0)); // 让出主线程不然卡死DOM
          // ID = 1
          
          background_image_ = release.gallery?.[0] || release.icon_url;
          Items.push({
            id: release.project_id,
            gallery: background_image_ == release.icon_url,
            name: release.title,
            icon: release.icon_url,
            url: release.license,
            desc: release.description,
            tags: release.display_categories,
            background_image: background_image_,
            color: release.color
          });
          if (Items.length % 100 === 0) {
            self.postMessage({ items: Items })
          }
        }
        if (Items.length > 0) {
          self.postMessage({ items: Items });
        }
      };
  
      await processModList(data.hits);
    } catch (error) {
      self.postMessage({ error: error.message });
    }
  };