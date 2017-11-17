defmodule MbtaWeb.Router do
  use MbtaWeb, :router

  pipeline :browser do
    plug :accepts, ["json"]
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", MbtaWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    get "/alerts", AlertsController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", MbtaWeb do
  #   pipe_through :api
  # end
end
