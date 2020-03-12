////////////////// Storage controller

const StorageCtrl = (function() {})();

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
    items: [
      //   { id: 0, name: "Steak dinner", calories: 1200 },
      //   { id: 1, name: "Cookie dinner", calories: 200 },
      //   { id: 2, name: "Egg dinner", calories: 120 }
    ],
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
    clearBtn: ".clear-btn"
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

    getSelectors: function() {
      return UISelectors;
    },

    getItemInput: function() {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      };
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
    },

    showEditState: function() {
      document.querySelector(UISelectors.updateBtn).style.display = "inline";
      document.querySelector(UISelectors.deleteBtn).style.display = "inline";
      document.querySelector(UISelectors.backBtn).style.display = "inline";
      document.querySelector(UISelectors.addBtn).style.display = "none";
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

    deleteSelectedItem: function() {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      let currentItem = ItemCtrl.getCurrentItem();
      let adjustedCurrentItem = String(`item-${currentItem.id}`);

      listItems = Array.from(listItems);

      listItems.forEach(function(listItem) {
        const itemId = listItem.getAttribute("id");

        if (itemId === adjustedCurrentItem) {
          document.querySelector(`#${itemId}`).remove();
        }
      });
    }
  };
})();

///////////////// App controller

const App = (function(UICtrl, ItemCtrl) {
  // Load event listeners

  const loadEventListeners = function() {
    // Get UI selectors
    const UISelectors = UICtrl.getSelectors();

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

  const deleteSelectedItem = function(e) {
    e.preventDefault();

    UICtrl.deleteSelectedItem();

    ItemCtrl.deleteSelectedItem();

    const totalCalories = ItemCtrl.getTotalCalories();
    UICtrl.showTotalCalories(totalCalories);

    UICtrl.clearEditState();
  };

  const clearListItems = function(e) {
    e.preventDefault();

    ItemCtrl.clearListItems();
    UICtrl.clearListItems();

    const totalCalories = ItemCtrl.getTotalCalories();
    UICtrl.showTotalCalories(totalCalories);
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

      // Fetch items from data structure
      const items = ItemCtrl.getItems();

      // Add to UI

      UICtrl.populateItemList(items);

      const totalCalories = ItemCtrl.getTotalCalories();

      // Add total calories to the ui

      UICtrl.showTotalCalories(totalCalories);

      // load event listeners
      loadEventListeners();
    }
  };
})(UICtrl, ItemCtrl);

// Initialize app

App.init();
