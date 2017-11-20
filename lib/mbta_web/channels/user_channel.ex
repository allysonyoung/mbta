defmodule MbtaWeb.UserChannel do
  use MbtaWeb, :channel
  alias Mbta.Session

  def join("user:" <> user_id, _payload, socket) do
    session = Session.new()
    socket = socket
    |> assign(:session, session)
    |> assign(:user_id, user_id)
    {:ok, Session.client_view(session), socket}
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  # def handle_in("ping", payload, socket) do
  #   {:reply, {:ok, payload}, socket}
  # end

  # handling user's current location updates
  def handle_in("loc_update", %{"lat" => lat}, %{"long" => long}, socket) do
    session = Session.curLoc(socket.assigns[:session], lat, long)
    socket = assign(socket, :session, session)
    {:reply, {:ok, Session.client_view(session), socket}}
  end

  # handing bus current location updates
  def handle_in("bus_update", %{"bus_id" => bus_id}, %{"lat" => lat}, %{"long" => long}, socket) do
    session = Session.busMove(socket.assigns[:session], bus_id, lat, long)
    socket = assign(socket, :session, session)
    {:reply, {:ok, Session.client_view(session), socket}}
  end

  # handling alerts updates
  def handle_in("alerts_update", socket) do
    session = Session.pushAlert(socket.assigns[:session])
    socket = assign(socket, :session, session)
    {:reply, {:ok, Session.client_view(session), socket}}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
