defmodule MbtaWeb.Router do
  use MbtaWeb, :router
  import MbtaWeb.Plugs

  pipeline :browser do
    plug :accepts, ["json"]
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :fetch_user
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug :fetch_session
    plug :fetch_user
  end

  scope "/", MbtaWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    get "/alerts", AlertsController, :index
    resources "/users", UserController
    post "/sessions", SessionController, :login
    delete "/sessions", SessionController, :logout
  end

  # Other scopes may use custom stacks.
  # scope "/api", MbtaWeb do
  #   pipe_through :api
  # end
end
