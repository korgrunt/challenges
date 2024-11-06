#!/usr/bin/env python
# -*- coding: utf-8 -*-
import re
fichier = open('./chall2.txt').readlines()
x = 0
while x < len(fichier):
        if len(fichier[x]) > 1 :#Evite les lignes vides
                regex = re.findall('([01])x([0-9]+)', fichier[x]) #Récup les caractères avec re.findall (osef du 'x')
                chaine = '' #Création de la nouvelle chaine
                for duo in regex : #Pour chaque duo de caractères dans regex
                        #A l'aide d'un opérateur ternaire, on remplace le 0 par X, ou par un ' ' (si c'est un 1) et on multiplie
                         chaine += (int(duo[0]) == 0 and 'X' or ' ') * int(duo[1]) #On insère tout ça dans chaine
        print(chaine) #Affichage de la nouvelle chaine qui nous donne le flag : "SOLUTION"
        x+=1


"""
0x3 = 3 pixel noir, 
+
1x1 = 1 pixel blanc
+
0x1 = 1 pixel noir
+
0x1 = 1 pixel noir
+
0x7 = 7 pixel noir

et ainsi de suite 


+1x2+0x15+1x1+0x8+1x1+0x8+1x1+0x1+1x1+0x1+1x1+0x1+1x1+0x1+1x1+0x3+1x1+0x1+1x1+0x3+1x1+0x1+1x4+0x2+1x1+0x25


"""