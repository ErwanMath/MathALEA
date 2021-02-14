import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,combinaison_listes, randint, calcul, arrondi,nombre_avec_espace} from "/modules/outils.js"

/**
 * Reconnaître une fonction affine
* @auteur Erwan Duplessy
* 6C30-1
* D'après le document "Attendus en fin de 3eme"
* On donne les fréquences d’apparition de chaque face d’un dé pour 10000 lancers. 
* L’élève interprète les résultats en les comparant aux probabilités théoriques.
*/

export default function Stabilisation_frequence() {
    "use strict"
    Exercice.call(this)
    this.titre = "Simulation d'expériences aléatoires";
    this.nb_questions = 3; // Ici le nombre de questions
    this.nb_questions_modifiable=true // Active le formulaire nombre de questions
    this.nb_cols = 1; // Le nombre de colonnes dans l'énoncé LaTeX
    this.nb_cols_corr = 1;// Le nombre de colonne pour la correction LaTeX
    this.pas_de_version_LaTeX=false // mettre à true si on ne veut pas de l'exercice dans le générateur LaTeX
    this.pas_de_version_HMTL=false // mettre à true si on ne veut pas de l'exercice en ligne
  // Voir la Classe Exercice pour une liste exhaustive des propriétés disponibles.
  
   this.sup = 1; // situation 1=dés
   this.sup2 = 10000; // nbLancers
   this.sup3 = false; // true = équiprobable, false = jeu truqué
  

  this.consigne = `<center><a title="Diacritica, CC BY-SA 3.0 &lt;https://creativecommons.org/licenses/by-sa/3.0&gt;, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Dice_(typical_role_playing_game_dice).jpg"><img width="128" alt="Dice (typical role playing game dice)" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Dice_%28typical_role_playing_game_dice%29.jpg/128px-Dice_%28typical_role_playing_game_dice%29.jpg"></a></center>`

  // c'est ici que commence le code de l'exercice cette fonction crée une copie de l'exercice
    this.nouvelle_version = function () {
    // la variable numero_de_l_exercice peut être récupérée pour permettre de différentier deux copies d'un même exo
    // Par exemple, pour être certain de ne pas avoir les mêmes noms de points en appelant 2 fois cet exo dans la même page
  
    this.liste_questions = [] // tableau contenant la liste des questions
  
      for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {

        texte = `` // Nous utilisons souvent cette variable pour construire le texte de la question.
        texte_corr = `` // Idem pour le texte de la correction.
        let nbFaces = 2*randint(1,5)+2; // nombre de faces du dé : 4, 6, 8, 10 ou 12
        let nbLancers = parseInt(this.sup2); // nombre de lancers 
        let tabEff = new Array();// tableau d'effectifs temporaires - une dimension [eff]
        let S = 0; // effectif total
        let tabRes = new Array(); // tableau des fréqeunces observées - deux dimensions [val, freq]

        texte += `On lance un dé équilibré à ${nbFaces} faces ${nombre_avec_espace(nbLancers)} fois. On étudie les fréquences d'apparition de chaque faces. On obtient les résultats suivants : <br>`;


        switch (parseInt(this.sup)) { // 
          case 1: // Tirages de dés
          if (this.sup3){
          for (let i = 0; i<nbFaces ; i++) {
              tabEff.push(0)
            }
            for (let i=0;i<nbLancers;i++){
              tabEff[randint(1,nbFaces)-1]++
            }
            for (let i =0; i<nbFaces ; i++) {
              tabRes[i] = [i, calcul(tabEff[i]/nbLancers)];
            }   
          }
          else {
            let face = randint(1, nbFaces); // on choisit une face au hasard. Elle aura une fréquence déséquilibrée.
            for (let i = 0; i<nbFaces ; i++) {
              tabEff.push(0)
            }
            for (let i=0;i<nbLancers;i++){
              tabEff[randint(1,nbFaces)-1]++
            }
            S=tabEff[face]/3
            tabEff[randint(1,nbFaces,face)-1]-=S
            tabEff[face-1]+=S
            for (let i =0; i<nbFaces ; i++) {
              tabRes[i] = [i, calcul(tabEff[i]/nbLancers)];
            }   
          }
            break;
  
          case 2: // Tirage dans une urne
            let face = randint(1, nbFaces); // on choisit une face au hasard. Elle aura une fréquence déséquilibrée.
            for (let i = 0; i<nbFaces ; i++) {
              tabEff.push(0)
            }
            for (let i=0;i<nbLancers;i++){
              tabEff[randint(1,nbFaces)-1]++
            }
            S=tabEff[face]/3
            tabEff[randint(1,nbFaces,face)-1]-=S
            tabEff[face-1]+=S
            for (let i =0; i<nbFaces ; i++) {
              tabRes[i] = [i, calcul(tabEff[i]/nbLancers)];
            }   
          break  
        }
        texte += `$\\begin{array}{|l|` + `c|`.repeat(nbFaces) + `}\n`;
        texte += `\\hline\n`;
        texte += `\\text{Numéro de la face}`;
        for (let i = 0; i<nbFaces ; i++) {
          texte += ` & \\textbf{\\text{${i+1}}}`;
        }
        texte += `\\\\\\hline\n`;
        texte += `\\text{Fréquence d'apparition}`;
        for (let i = 0; i<nbFaces ; i++) {
          texte += ` & \\text{${arrondi(100*tabRes[i][1], 1)}} \\% `;
        }
        texte += `\\\\\\hline\n`;
        texte += `\\end{array}\n$`;
        texte += `<br>`;
        texte += `Ces résultats vous paraissent-ils normaux ? Détailler votre réponse en vous basant sur des calculs.<br>`;


        if (this.liste_questions.indexOf(texte) == -1) {
          // Si la question n'a jamais été posée, on la stocke dans la liste des questions
          this.liste_questions.push(texte);
          this.liste_corrections.push(texte_corr);
          i++;
        }
        cpt++;
      }
      liste_de_question_to_contenu(this); // On envoie l'exercice à la fonction de mise en page
    };
  // Si les variables suivantes sont définies, elles provoquent l'affichage des formulaires des paramètres correspondants
  // Il peuvent être de 3 types : _numerique, _case_a_cocher ou _texte.
  // Il sont associés respectivement aux paramètres sup, sup2 et sup3.
  
  this.besoin_formulaire_numerique = ['Type d\'expérience', 2, `1 : Tirage de dés\n 2 : Tirage dans une urne`]
  this.besoin_formulaire2_texte = ["Nombre de tirages"];
  this.besoin_formulaire3_case_a_cocher =['équiprobabilité',true]
  
  } // Fin de l'exercice.
  