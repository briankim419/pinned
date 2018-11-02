Rails.application.routes.draw do
  root 'schedules#new'
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

  namespace :api do
    namespace :v1 do
      post 'location/search', to: 'location#search'
    end
  end

  resources :locations, only: [:index, :show, :new, :create]
  resources :schedules, only: [:index, :show, :new, :create]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
