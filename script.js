// script.js
fetch('data.json')
    .then(res => res.json())
    .then(data => {
        const lijst = document.getElementById('gerechten-lijst');

        data.gerechten.forEach((gerecht, index) => {
            const checkboxId = `gerecht-${index}`;

            const wrapper = document.createElement('label');
            wrapper.htmlFor = checkboxId;
            wrapper.style.display = 'block';
            wrapper.style.margin = '0.5rem 0';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = gerecht.naam;
            checkbox.id = checkboxId;

            wrapper.appendChild(checkbox);
            wrapper.append(` ${gerecht.naam}`);
            lijst.appendChild(wrapper);
        });

        document.getElementById('genereer-lijst').addEventListener('click', () => {
            const geselecteerde = Array.from(document.querySelectorAll('#gerechten-lijst input:checked')).map(cb => cb.value);
            const ingrediëntenMap = {};

            data.gerechten.forEach(gerecht => {
                if (geselecteerde.includes(gerecht.naam)) {
                    gerecht.ingredienten.forEach(ing => {
                        if (ingrediëntenMap[ing.naam]) {
                            ingrediëntenMap[ing.naam] += ing.hoeveelheid;
                        } else {
                            ingrediëntenMap[ing.naam] = ing.hoeveelheid;
                        }
                    });
                }
            });

            const lijst = document.getElementById('boodschappenlijst');
            lijst.innerHTML = '';
            Object.entries(ingrediëntenMap).forEach(([naam, totaal]) => {
                const li = document.createElement('li');
                li.textContent = `${naam}: ${totaal}`;
                lijst.appendChild(li);
            });
        });
    });
