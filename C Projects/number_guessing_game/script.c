#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main(){
    int random, guessed_no, no_of_guesses = 0; 
    srand(time(NULL));
    printf("Welcome to the Number guessing game\n");
    random = rand() % 100 + 1; 
    do
    {
        printf("Please enter your guess(1 to 100) ==>\n");
        scanf("%d",&guessed_no);
        no_of_guesses++;
        if (guessed_no < random){
            printf("Guess a larger no\n"); 
        }else if (guessed_no > random){
            printf("Guess a smaller no\n"); 
        }else{
            printf("You guessed it in %d attempts.\n",no_of_guesses); 
        }
        
    } while (guessed_no != random);

    printf("Thanks for playing the game.\nDeveloped by: %s", "Prathik");
    
}