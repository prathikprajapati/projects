#include <stdio.h>
#include <string.h>

#define MAX_BOOKS 100

// Structure to store book details
struct Book {
    char title[50];
    char author[50];
    int ISBN;
    int isIssued; // 0 = Available, 1 = Issued
};

// Function to add a book
void addBook(struct Book books[], int *count) {
    if (*count >= MAX_BOOKS) {
        printf("Library is full!\n");
        return;
    }
    printf("Enter book title: ");
    scanf(" %[^\n]s", books[*count].title);
    printf("Enter author name: ");
    scanf(" %[^\n]s", books[*count].author);
    printf("Enter ISBN number: ");
    scanf("%d", &books[*count].ISBN);

    books[*count].isIssued = 0; // Book is available by default
    (*count)++;
    printf("Book added successfully!\n");
}

// Function to issue a book
void issueBook(struct Book books[], int count) {
    int isbn, i;
    printf("Enter ISBN of book to issue: ");
    scanf("%d", &isbn);

    for (i = 0; i < count; i++) {
        if (books[i].ISBN == isbn) {
            if (books[i].isIssued == 0) {
                books[i].isIssued = 1;
                printf("Book issued successfully!\n");
            } else {
                printf("Book is already issued!\n");
            }
            return;
        }
    }
    printf("Book not found!\n");
}

// Function to return a book
void returnBook(struct Book books[], int count) {
    int isbn, i;
    printf("Enter ISBN of book to return: ");
    scanf("%d", &isbn);

    for (i = 0; i < count; i++) {
        if (books[i].ISBN == isbn) {
            books[i].isIssued = 0;
            printf("Book returned successfully!\n");
            return;
        }
    }
    printf("Book not found!\n");
}

// Function to display all books
void displayBooks(struct Book books[], int count) {
    if (count == 0) {
        printf("No books in library.\n");
        return;
    }
    printf("\nLibrary Books:\n");
    for (int i = 0; i < count; i++) {
        printf("Title: %s, Author: %s, ISBN: %d, Status: %s\n", 
               books[i].title, books[i].author, books[i].ISBN, 
               books[i].isIssued ? "Issued" : "Available");
    }
}

int main() {
    struct Book books[MAX_BOOKS];
    int count = 0;
    int choice;

    while (1) {
        printf("\nLibrary Management System\n");
        printf("1. Add Book\n2. Issue Book\n3. Return Book\n4. Display Books\n5. Exit\n");
        printf("Enter choice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1: addBook(books, &count); break;
            case 2: issueBook(books, count); break;
            case 3: returnBook(books, count); break;
            case 4: displayBooks(books, count); break;
            case 5: printf("Thank You for using Me\nBye-Bye"); return 0;
            default: printf("Invalid choice! Try again.\n");
        }
    }
}
