Rails.application.routes.draw do
  root "fruits#choose_input_method"
  get "mouse_game", to: "fruits#mouse_game"
  get "keyboard_game", to: "fruits#keyboard_game"
end
