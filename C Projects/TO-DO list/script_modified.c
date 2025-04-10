#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct TodoItem {
    char description[100];
    int completed;
} TodoItem;

typedef struct TodoList {
    TodoItem* items;
    int size;
} TodoList;

TodoList* createTodoList() {
    TodoList* list = (TodoList*)malloc(sizeof(TodoList));
    if (list == NULL) {
        fprintf(stderr, "Memory allocation failed for TodoList\n");
        exit(EXIT_FAILURE);
    }
    list->items = NULL;
    list->size = 0;
    return list;
}

TodoItem* createTodoItem(char* description) {
    TodoItem* item = (TodoItem*)malloc(sizeof(TodoItem));
    if (item == NULL) {
        fprintf(stderr, "Memory allocation failed for TodoItem\n");
        exit(EXIT_FAILURE);
    }
    strcpy(item->description, description);
    item->completed = 0;
    return item;
}

void addTodoItem(TodoList* list, TodoItem* item) {
    list->size++;
    list->items = (TodoItem*)realloc(list->items, list->size * sizeof(TodoItem));
    if (list->items == NULL) {
        fprintf(stderr, "Memory reallocation failed\n");
        exit(EXIT_FAILURE);
    }
    list->items[list->size - 1] = *item;
}

void printTodoList(TodoList* list) {
    for (int i = 0; i < list->size; i++) {
        printf("%d. %s - %s\n", i + 1, list->items[i].description, list->items[i].completed ? "Completed" : "Not Completed");
    }
}

void markCompleted(TodoList* list, char* description) {
    for (int i = 0; i < list->size; i++) {
        if (strcmp(list->items[i].description, description) == 0) {
            list->items[i].completed = 1;
            break;
        }
    }
}

void freeTodoList(TodoList* list) {
    free(list->items); // Correctly free the items array
    free(list);
}

int main() {
    TodoList* list = createTodoList();

    while (1) {
        printf("Todo List Menu:\n");
        printf("1. Add Todo Item\n");
        printf("2. Print Todo List\n");
        printf("3. Mark Todo Item as Completed\n");
        printf("4. Exit\n");

        int choice;
        printf("Enter your choice: ");
        scanf("%d", &choice);
        getchar(); // Clear the newline character from the input buffer

        switch (choice) {
            case 1: {
                char description[100];
                printf("Enter todo item description: ");
                fgets(description, sizeof(description), stdin);
                description[strcspn(description, "\n")] = 0; // Remove newline character
                addTodoItem(list, createTodoItem(description));
                break;
            }
            case 2:
                printf("Todo List:\n");
                printTodoList(list);
                break;
            case 3: {
                char description[100];
                printf("Enter todo item description to mark as completed: ");
                fgets(description, sizeof(description), stdin);
                description[strcspn(description, "\n")] = 0; // Remove newline character
                markCompleted(list, description);
                break;
            }
            case 4:
                freeTodoList(list);
                return 0;
            default:
                printf("Invalid choice. Please try again.\n");
        }
    }

    return 0;
}
