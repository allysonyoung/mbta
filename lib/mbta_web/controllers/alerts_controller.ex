defmodule MbtaWeb.AlertsController do 
  use MbtaWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
