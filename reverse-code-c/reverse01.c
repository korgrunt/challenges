#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <string.h>

int main() {
    // Phrase secrète divisée en plusieurs morceaux
    char part2[] = { 'e', 'R', 's', '3', '\0' };
    char part4[] = { 'h', '1', 's', '\0' };

    // Buffer pour reconstituer le flag
    char secret[50];

    char input[50] = "";   // Stocke l'entrée utilisateur
    char buffer[50] = "";  // Buffer pour la concaténation progressive
    int attempts = 0;


    srand(time(NULL));  // Initialise le générateur de nombres aléatoires
    int nombre_inutile = rand() % 100;  // Génère un nombre aléatoire entre 0 et 99

    // Effectue plusieurs opérations sans but réel
    nombre_inutile += 42;
    nombre_inutile *= 3;
    nombre_inutile = nombre_inutile % 55;
    nombre_inutile ^= 0x5A;  // Opération XOR avec une constante
    nombre_inutile += (nombre_inutile / 2) - 7;

    // Imprime le résultat, mais ce résultat n'est jamais utilisé
    printf("Useful Number : %d\n", nombre_inutile);
    char part1[] = { 'R', '3', 'v', '\0' };

    printf("Entrez une phrase pour deviner le flag:\n");
    char part3[] = { 'T', '\0' };
    snprintf(secret, sizeof(secret), "%s%s%s%s", part1, part2, part3, part4);

    
    printf("> ");
    fgets(input, sizeof(input), stdin);
    input[strcspn(input, "\n")] = '\0';  // Retire le saut de ligne

    // Concatenation progressive
    strcat(buffer, input);

    // Vérification du flag
    if (strcmp(buffer, secret) == 0) {
        printf("Bravo vous avez trouvé le flag !\n");
        return 1;
    } else {
        printf("Échec, execution de code malveillant sur votre machine en cours...\n");
        attempts++;
        if (attempts > 5) {
            printf("Indice : La phrase commence par '%c'\n", part1[0]);
        }
    }
    
    return 0;
}

//R3veRs3Th1s