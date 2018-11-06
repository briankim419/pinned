Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users

  namespace :api do
    namespace :v1 do
      resources :schedules, only: [:index, :show, :new, :create] do
        resources :timeslots, only: [:index, :show, :new, :create]
      end
    end
  end

  namespace :api do
    namespace :v1 do
      resources :timeslots, only: [:index, :show, :new, :create] do
        resources :locations, only: [:index, :show, :new, :create]
      end
    end
  end

  namespace :api do
    namespace :v1 do
      resources :locations, only: [:index, :show, :new, :create]
    end
  end

  namespace :api do
    namespace :v1 do
      get "/yelp", to: "yelp#search"
    end
  end

  resources :schedules, only: [:search] do
    get 'search', on: :collection
  end

  resources :locations, only: [:index, :show, :new, :create]
  resources :schedules, only: [:index, :show, :new, :create]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
