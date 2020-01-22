import { useState } from 'react';

// useInput(initialValue, placeholder) => value, setValue, isValid, placeholder..
export const useInput = (initialValue, placeholder, options = {}) => {
  const [value, setValue] = useState(initialValue);

  // useInput a besoin de savoir quelle est la logique de validation à appliquer
  // à l'input qu'il gère.
  // L'utilisateur du hook useInput peut (mais ce n'est pas obligatoire) fournir
  // une fonction de validation, dans options.validate
  // S'il ne fournit pas de fonction, alors useInput va utiliser une logique de
  // validation par défaut, qui en gros ne valide rien de spécial.
  const validate = options.validate || (() => true);

  // On vérifie la validité de la valeur courante du champ.
  const isValid = validate(value);

  // On retourne une boîte à outils spécialisées dans la gestion d'input.
  return {
    // props
    props: {
      value: value,
      onChange: (event) => { setValue(event.target.value); },
      placeholder: placeholder + '…',
    },

    // outils, informations… à propos de l'input géré par ce hook
    validate: validate,
    isValid: isValid
  };
};

// ... ici, plus de hooks :D ...
