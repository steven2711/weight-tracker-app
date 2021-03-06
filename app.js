const LogCtrl = (function() {
  const DailyItem = function(date, weight, totalCalories) {
    this.date = date;
    this.weight = weight;
    this.totalCalories = totalCalories;
  };

  const MonthlyItem = function(month, startWeight, endWeight, totalCalories) {
    this.month = month;
    this.startWeight = startWeight;
    this.endWeight = endWeight;
    this.totalCalories = totalCalories;
  };

  const data = {
    monthlyLog: [
      {
        month: "Febuary",
        startWeight: 200,
        endWeight: 190,
        totalCalories: 10000,
        suggestedTotalCalories: 15000
      },
      {
        month: "January",
        startWeight: 210,
        endWeight: 200,
        totalCalories: 10000,
        suggestedTotalCalories: 15000
      }
    ]
  };

  return {
    logData: function() {
      return data;
    },

    createDayLogObject: function(date, weight, calories) {
      const newDailyLog = new DailyItem(date, weight, calories);

      return newDailyLog;
    },

    createMonthLogObject: function() {
      console.log("fix this shit");
    }
  };
})();

////////////////// Storage controller

const StorageCtrl = (function() {
  return {
    storeItem: function(item) {
      let items = [];

      // cheack if items in ls

      if (localStorage.getItem("items") === null) {
        items.push(item);

        localStorage.setItem("items", JSON.stringify(items));
      } else {
        items = JSON.parse(localStorage.getItem("items"));

        items.push(item);

        localStorage.setItem("items", JSON.stringify(items));
      }
    },

    storeDayLog: function(log) {
      let dayLogs = [];

      // cheack if items in ls

      if (localStorage.getItem("dayLogs") === null) {
        dayLogs.push(log);

        localStorage.setItem("dayLogs", JSON.stringify(dayLogs));
      } else {
        dayLogs = JSON.parse(localStorage.getItem("dayLogs"));

        dayLogs.push(log);

        localStorage.setItem("dayLogs", JSON.stringify(dayLogs));
      }
    },

    storeWeight: function(newWeight) {
      let weight = [];

      // cheack if items in ls

      if (localStorage.getItem("weight") === null) {
        weight.push(newWeight);

        localStorage.setItem("weight", JSON.stringify(weight));
      } else {
        weight = JSON.parse(localStorage.getItem("weight"));

        weight.push(newWeight);

        localStorage.setItem("weight", JSON.stringify(weight));
      }
    },

    checkWeight: function() {
      if (localStorage.getItem("weight") === null) {
        return false;
      } else {
        return true;
      }
    },

    getWeight: function() {
      return JSON.parse(localStorage.getItem("weight"));
    },

    getItemsFromStorage: function() {
      let items;

      if (localStorage.getItem("items") === null) {
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem("items"));
      }

      return items;
    },

    getDailyLogsFromStorage: function() {
      let dayLogs;

      if (localStorage.getItem("dayLogs") === null) {
        dayLogs = [];
      } else {
        dayLogs = JSON.parse(localStorage.getItem("dayLogs"));
      }

      return dayLogs;
    },

    updateItemStorage: function(updatedItem) {
      let items = JSON.parse(localStorage.getItem("items"));

      items.forEach(function(item, index) {
        if (updatedItem.id === item.id) {
          items.splice(index, 1, updatedItem);
        }
      });

      localStorage.setItem("items", JSON.stringify(items));
    },

    deleteItemStorage: function(currentItem) {
      let items = JSON.parse(localStorage.getItem("items"));

      items.forEach((item, index) => {
        if (item.id === currentItem.id) {
          items.splice(index, 1);
        }
      });

      localStorage.setItem("items", JSON.stringify(items));
    },

    clearItemsStorage: function() {
      let items;

      if (localStorage.getItem("items") === null) {
        items = [];
      } else {
        items = [];
      }

      localStorage.setItem("items", JSON.stringify(items));
    },

    checkLastOpenedDate: function() {
      let newDate = {
        month: new Date().getMonth() + 1,
        day: new Date().getDate(),
        year: new Date().getFullYear()
      };

      if (localStorage.getItem("lastOpened") === null) {
        localStorage.setItem("lastOpened", JSON.stringify(newDate));
      } else {
        return JSON.parse(localStorage.getItem("lastOpened"));
      }
    },

    updateLastOpenedDate: function(date) {
      if (localStorage.getItem("lastOpened") === null) {
        localStorage.setItem("lastOpened", JSON.stringify(date));
      } else {
        localStorage.setItem("lastOpened", JSON.stringify(date));
      }
    },

    addCurrentWeight: function(weight) {
      if (localStorage.getItem("weight") === null) {
        localStorage.setItem("weight", JSON.stringify(weight));
      } else {
        localStorage.setItem("weight", JSON.stringify(weight));
      }
    },

    clearWeight: function() {
      localStorage.setItem("weight", null);
    }
  };
})();

/////////////////// Item controller

const ItemCtrl = (function() {
  // Item constructor

  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // Data structure / state

  const data = {
    items: StorageCtrl.getItemsFromStorage(),
    currentItem: null,
    totalCalories: 0
  };

  return {
    logData: function() {
      return data;
    },
    getItems: function() {
      return data.items;
    },

    addItem: function({ name, calories }) {
      let ID;

      // create id

      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Calories to number

      calories = parseInt(calories);

      // create new item

      let newItem = new Item(ID, name, calories);

      data.items.push(newItem);

      return newItem;
    },

    getTotalCalories: function() {
      let totalCalories = 0;

      data.items.forEach(function(item) {
        totalCalories += item.calories;
      });

      data.totalCalories = totalCalories;

      return data.totalCalories;
    },

    getItemById: function(id) {
      let found;

      data.items.forEach(item => {
        if (item.id === id) {
          found = item;
        }
      });

      return found;
    },

    setCurrentItem: function(item) {
      data.currentItem = item;
    },

    getCurrentItem: function() {
      return data.currentItem;
    },

    updateItem: function(name, calories) {
      calories = parseInt(calories);

      let found = null;

      data.items.forEach(function(item) {
        if (item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });

      return found;
    },

    clearListItems: function() {
      data.items = [];
      data.currentItem = null;
      data.calories = 0;
    },

    deleteSelectedItem: function() {
      const currentItem = ItemCtrl.getCurrentItem();

      const newDataList = data.items.filter(item => item.id !== currentItem.id);

      data.items = newDataList;
    }
  };
})();

/////////////////// UI controller

const UICtrl = (function() {
  const UISelectors = {
    itemList: "#item-list",
    addBtn: ".add-btn",
    updateBtn: ".update-btn",
    deleteBtn: ".delete-btn",
    backBtn: ".back-btn",
    itemNameInput: "#item-name",
    itemCaloriesInput: "#item-calories",
    totalCaloriesDisplay: ".total-calories",
    listItems: "#item-list li",
    clearBtn: ".clear-btn",
    weightCard: "#weight-card",
    weightInput: "#todays-weight",
    addWeightBtn: ".add-weight-btn",
    dailyList: "#daily-list",
    mealInputCard: "#meal-input-card",
    dataSection: "#data-section"
  };

  return {
    populateItemList: function(items) {
      let html = "";

      items.forEach(item => {
        html += `
        <li class="collection-item" id="item-${item.id}">
        
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>

      </li>
            `;
      });

      // Insert list items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },

    populateDailyLog: function(logItems) {
      let html = "";

      logItems.forEach(item => {
        html += `
        <li class="collection-item">
        <div>
        <em>${item.date}</em> </div>
        
        <div>
        <strong>Weight:</strong><em>${item.weight}</em> 
        </div>

        <div>
        <strong>Total calories:</strong><em>${item.totalCalories}/2000</em>
        </div>
      </li>
            `;
      });

      document.querySelector(UISelectors.dailyList).innerHTML = html;
    },

    getSelectors: function() {
      return UISelectors;
    },

    getItemInput: function() {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      };
    },

    getWeightInput: function() {
      return document.querySelector(UISelectors.weightInput).value;
    },

    addItemToList: function(item) {
      const li = document.createElement("li");
      li.className = "collection-item";
      li.id = `item-${item.id}`;
      li.innerHTML = `
      <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class=" secondary-content"><i class="edit-item fa fa-pencil"></i></a>
      `;

      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement("beforeend", li);
    },

    clearItemInput: function() {
      document.querySelector(UISelectors.itemNameInput).value = "";

      document.querySelector(UISelectors.itemCaloriesInput).value = "";
    },

    showTotalCalories: function(totalCalories) {
      document.querySelector(
        UISelectors.totalCaloriesDisplay
      ).textContent = totalCalories;
    },

    clearEditState: function() {
      UICtrl.clearItemInput();
      document.querySelector(UISelectors.updateBtn).style.display = "none";
      document.querySelector(UISelectors.deleteBtn).style.display = "none";
      document.querySelector(UISelectors.backBtn).style.display = "none";
      document.querySelector(UISelectors.addBtn).style.display = "inline";
      document.querySelector(UISelectors.clearBtn).style.display = "block";
    },

    showEditState: function() {
      document.querySelector(UISelectors.updateBtn).style.display = "inline";
      document.querySelector(UISelectors.deleteBtn).style.display = "inline";
      document.querySelector(UISelectors.backBtn).style.display = "inline";
      document.querySelector(UISelectors.addBtn).style.display = "none";
      document.querySelector(UISelectors.clearBtn).style.display = "none";
    },

    addItemToForm: function() {
      document.querySelector(
        UISelectors.itemNameInput
      ).value = ItemCtrl.getCurrentItem().name;

      document.querySelector(
        UISelectors.itemCaloriesInput
      ).value = ItemCtrl.getCurrentItem().calories;

      UICtrl.showEditState();
    },

    updateListItem: function(item) {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      listItems = Array.from(listItems);

      listItems.forEach(function(listItem) {
        const itemId = listItem.getAttribute("id");

        if (itemId === `item-${item.id}`) {
          document.querySelector(
            `#${itemId}`
          ).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class=" secondary-content"><i class="edit-item fa fa-pencil"></i></a>
              `;
        }
      });
    },

    clearListItems: function() {
      const list = document.querySelectorAll(UISelectors.listItems);

      for (let i = 0; i < list.length; i++) {
        list[i].remove();
      }
    },

    deleteSelectedItem: function(id) {
      const itemId = `#item-${id}`;

      const item = document.querySelector(itemId);

      item.remove();
    },

    showCurrentWeightCard: function() {
      document.querySelector(UISelectors.weightCard).style.display = "block";
    },

    hideCurrentWeightCard: function() {
      document.querySelector(UISelectors.weightCard).style.display = "none";
    },

    hideMealInputAndDataSection: function() {
      document.querySelector(UISelectors.dataSection).style.display = "none";

      document.querySelector(UISelectors.mealInputCard).style.display = "none";
    },

    showMealInputAndDataSection: function() {
      document.querySelector(UISelectors.dataSection).style.display = "block";

      document.querySelector(UISelectors.mealInputCard).style.display = "block";
    }
  };
})();

///////////////// App controller //////////////////////////

const App = (function(UICtrl, ItemCtrl, StorageCtrl, LogCtrl) {
  // Load event listeners

  const loadEventListeners = function() {
    // Get UI selectors
    const UISelectors = UICtrl.getSelectors();

    // Add/remove weight card based on data

    document.addEventListener("DOMContentLoaded", checkDateAndUpdate);

    document
      .querySelector(UISelectors.addWeightBtn)
      .addEventListener("click", addCurrentWeight);

    // Add item event
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", itemAddSubmit);

    // Edit icon click

    document
      .querySelector(UISelectors.itemList)
      .addEventListener("click", itemEditClick);

    // Disable submit on enter

    document.addEventListener("keypress", function(e) {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });

    // Back out of edit state

    document
      .querySelector(UISelectors.backBtn)
      .addEventListener("click", backOutOfEditState);

    // Update item

    document
      .querySelector(UISelectors.updateBtn)
      .addEventListener("click", itemUpdateSubmit);

    // Clear all list items
    document
      .querySelector(UISelectors.clearBtn)
      .addEventListener("click", clearListItems);

    // Delete item
    document
      .querySelector(UISelectors.deleteBtn)
      .addEventListener("click", deleteSelectedItem);
  };

  const checkDateAndUpdate = function() {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1; // months are 0 indexed
    const day = new Date().getDate();

    const currentDate = {
      month,
      day,
      year
    };

    const lastOpenedDate = StorageCtrl.checkLastOpenedDate();
    const formattedLastOpenedDate = `${lastOpenedDate.month}/${lastOpenedDate.day}/${lastOpenedDate.year}`;

    //// Handle daily log ///////////////

    // update daily log if its a new day
    if (day !== lastOpenedDate.day) {
      // grab info for daily log
      const oldCalories = ItemCtrl.getTotalCalories();
      const oldDate = formattedLastOpenedDate;
      const oldWeight = StorageCtrl.getWeight();
      // log items from yesterday

      const dailyLogItem = LogCtrl.createDayLogObject(
        oldDate,
        oldWeight,
        oldCalories
      );

      // add daily logged item to local storage

      StorageCtrl.storeDayLog(dailyLogItem);

      // clear data from item list ui & itemctrl
      UICtrl.clearListItems();
      ItemCtrl.clearListItems();

      // clear data from item list localStorage
      StorageCtrl.clearItemsStorage();

      // show total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      UICtrl.showTotalCalories(totalCalories);

      // update last opened date
      StorageCtrl.updateLastOpenedDate(currentDate);

      // Clear weight

      StorageCtrl.clearWeight();
    }
  };

  const addCurrentWeight = function(e) {
    e.preventDefault();

    const input = UICtrl.getWeightInput();

    StorageCtrl.addCurrentWeight(input);

    location.reload();
  };

  const deleteSelectedItem = function(e) {
    e.preventDefault();

    const currentItem = ItemCtrl.getCurrentItem();

    UICtrl.deleteSelectedItem(currentItem.id);

    ItemCtrl.deleteSelectedItem();

    const totalCalories = ItemCtrl.getTotalCalories();
    UICtrl.showTotalCalories(totalCalories);

    StorageCtrl.deleteItemStorage(currentItem);

    UICtrl.clearEditState();
  };

  const clearListItems = function(e) {
    e.preventDefault();

    ItemCtrl.clearListItems();
    UICtrl.clearListItems();

    const totalCalories = ItemCtrl.getTotalCalories();
    UICtrl.showTotalCalories(totalCalories);

    StorageCtrl.clearItemsStorage();
  };

  const itemAddSubmit = function(e) {
    e.preventDefault();

    // get item input from ui

    const input = UICtrl.getItemInput();

    // check if ther is info

    if (input.name !== "" && input.calories !== "") {
      // add item

      const newItem = ItemCtrl.addItem(input);

      // add item to ui list

      UICtrl.addItemToList(newItem);

      // Get total calories

      const totalCalories = ItemCtrl.getTotalCalories();

      // Add total calories to the ui

      UICtrl.showTotalCalories(totalCalories);

      // Local storage

      StorageCtrl.storeItem(newItem);

      // Clear input fields
      UICtrl.clearItemInput();
    }
  };

  const itemEditClick = function(e) {
    e.preventDefault();

    if (e.target.classList.contains("edit-item")) {
      const listItemId = e.target.parentNode.parentNode.id;

      const listIdArray = listItemId.split("-");

      const id = parseInt(listIdArray[1]);

      const itemToEdit = ItemCtrl.getItemById(id);

      // Set current item

      ItemCtrl.setCurrentItem(itemToEdit);

      // Add item to form

      UICtrl.addItemToForm();
    }
  };

  const itemUpdateSubmit = function(e) {
    e.preventDefault();

    // Get item input

    const input = UICtrl.getItemInput();

    // Update data structure

    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

    // Update UI

    UICtrl.updateListItem(updatedItem);

    // Get total calories

    const totalCalories = ItemCtrl.getTotalCalories();

    // Add total calories to the ui

    UICtrl.showTotalCalories(totalCalories);

    // update local storage

    StorageCtrl.updateItemStorage(updatedItem);

    UICtrl.clearEditState();
  };

  const backOutOfEditState = function(e) {
    e.preventDefault();
    UICtrl.clearEditState();
  };

  return {
    init: function() {
      // clear edit state

      UICtrl.clearEditState();

      UICtrl.hideCurrentWeightCard();

      if (!StorageCtrl.checkWeight()) {
        // show weight card and hide everything else
        UICtrl.showCurrentWeightCard();
        UICtrl.hideMealInputAndDataSection();
      } else {
        UICtrl.hideCurrentWeightCard();
        UICtrl.showMealInputAndDataSection();
      }

      // Fetch items from data structure
      const items = ItemCtrl.getItems();

      const dailyLogItems = StorageCtrl.getDailyLogsFromStorage();

      // Add to UI

      UICtrl.populateItemList(items);

      UICtrl.populateDailyLog(dailyLogItems);

      const totalCalories = ItemCtrl.getTotalCalories();

      // Add total calories to the ui

      UICtrl.showTotalCalories(totalCalories);

      // load event listeners
      loadEventListeners();
    }
  };
})(UICtrl, ItemCtrl, StorageCtrl, LogCtrl);

// Initialize app

App.init();
