# React-Keyboard


Key handles the mouse press (mouseenter, mouseleave)
Keyboard handles mousedown and mouseup, sends this prop to key and key connects it with enter/leave and responds with state pressed
key state changes to pressed and it fires handleClick from keyboard passing its id
key classname depends on pressed state (comment in final readme that its only for that because the task said so)
handleclick just transmits value to active input (active input chosen in keyboards state)
input displays value and if its backspace deletes last character
capslock - state of keyboard
handleclick recieves id of key and chooses value from an array (created at the begining assigning id to each key) depending on capslock state



    InputField dostaje dane z ram lub nic w zależności od zmiennej w state activeInput
        input renderuje swoją treść, która jest modysfikowana za kazdym razem kiedy App przyśle nowe dane w props
    
    Keyboard dostaje funkcję do przechwytywania danych
        Keyboard zaciąga dane z pliku json
        zapisuje przyciski w liście
        renderuje:
            kontener który reaguje na klikanie myszką i zmienia zmienną ze state mousedown
                zmiana mousedown triggeruje funkcję obsługującą eventy myszki
                    w zależności od konfiguracji zmiennej z id najechanego klawisza i czy myszka jest wcisnieta wysyła różny output do aplikacji
                    obsługuje też kliknięcia capslock i backspace
                    ustawia pętle wsysyłania klaiwsza do aplikacji
            w kontenerze rzędy z PRZYCISKAMI które dostają swoją tresc w zaleznosci od capslocka, informacje czy zostały wciśnięte
            i funkcje do przechwytywania informacji czymyszka wjechała w klawisz
                Key renderuje klawisz z informacja czy jest wcisniety czy nie, z jego treścią i z przypisanymi funkcjami reagującymi na wjechanie/wyjechanie
                - wjechanie/wyjechanie wysyła do Keyboard informacje ze swoim id i czy wjechano czy wyjechano
            -przechwytuje to klawiatura i ustawia id najechanego przycisku lub je czysci jesli na zaden nie wjechano
            - triggeruje to tę samą funkcję co wciśnięcie przycisku



