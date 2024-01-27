
# Enhanced To-Do List

This is a to-do list. It allows you to create, edit, and delete tasks, as well as assign them categories. You can sort by id, or order added, or by alphabetical order, as well as filter by each category. Any changes made to the tasks or their categories are saved in local storage.

There is a minor issue where, after adding a category, the edit button for that category does not work. Refreshing the page will make it functional. This issue is because the add button triggers a rerender in the main .jsx file, not in the file for the task component, so the useEffect in the task component's .jsx file will not trigger and update the list of category editing buttons. I was unable to fix this issue in the time I had, so it remains in the project. I also had insufficient time to do extensive styling, so although there is some styling in the project, it remains very simple.
## Authors

- [Brianne Siemsen](https://www.github.com/parsnippity)
## Run Locally

Clone the project

```bash
  git clone https://github.com/parsnippity/enhanced-todo-list
```

Go to the project directory

```bash
  cd enhanced-todo-list
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

