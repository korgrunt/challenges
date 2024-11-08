use std::io::{self, Write};
use sha2::{Sha256, Digest};
use base64::decode;

fn main() {
    // Flag encodé et découpé en 10 morceaux
    // 
    let mut part1 = "RmxhZx".to_string();   // ajout d'un "x" à la fin
    let mut part2 = "3tSdXy".to_string();   // ajout d'un "y" à la fin
    let mut part3 = "N0XzFz".to_string();   // ajout d'un "z" à la fin
    let mut part4 = "zX2wxp".to_string();   // ajout d'un "p" à la fin
    let mut part5 = "dHRsNq".to_string();   // ajout d'un "q" à la fin
    let mut part6 = "V9iaXr".to_string();   // ajout d'un "r" à la fin
    let mut part7 = "RfaGFs".to_string();   // ajout d'un "s" à la fin
    let mut part8 = "yZF90t".to_string();   // ajout d'un "t" à la fin
    let mut part9 = "b19yMu".to_string();   // ajout d'un "u" à la fin
    let mut part10 = "3ZlcnNlfQ==v".to_string(); // ajout d'un "v" à la fin

    part1.pop();
    part2.pop();
    part3.pop();
    part4.pop();
    part5.pop();
    part6.pop();
    part7.pop();
    part8.pop();
    part9.pop();
    part10.pop();
    
    // Assembler les morceaux dans le bon ordre
    let encoded_flag = format!(
        "{}{}{}{}{}{}{}{}{}{}",
        part1, part2, part3, part4, part5, part6, part7, part8, part9, part10
    );

    // Décoder le flag
    let decoded_flag = decode(&encoded_flag).expect("Erreur de décodage du flag");
    let flag = String::from_utf8(decoded_flag).expect("Erreur de conversion du flag");

    // Calculer le hash du flag
    let mut hasher = Sha256::new();
    hasher.update(&flag);
    let flag_hash = hasher.finalize();

    // Demander à l'utilisateur d'entrer un mot de passe
    println!("Entrez le mot de passe :");
    let mut input = String::new();
    io::stdout().flush().unwrap();
    io::stdin().read_line(&mut input).expect("Erreur de lecture");

    // Enlever le retour à la ligne
    let input = input.trim();

    // Calculer le hash de l'entrée utilisateur
    let mut hasher = Sha256::new();
    hasher.update(input);
    let input_hash = hasher.finalize();

    // Comparer le hash de l'entrée avec le hash du flag
    if input_hash.as_slice() == flag_hash.as_slice() {
        println!("Bravo ! Vous avez trouvé le bon mot de passe.");
    } else {
        println!("Désolé, mot de passe incorrect.");
    }
}
