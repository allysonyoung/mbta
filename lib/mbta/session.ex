defmodule Mbta.Session do
  def new do
    %{
      curLoc: nil,
      alerts: get_alerts(),
      direction: 0,
      stop_id: nil
    }
  end

  def client_view(session) do
    
  end

  # returns map of alerts concerning all of mbta transit
  # TODO: affected_services == bus, severity notice maybe
  def get_alerts() do
    key = Application.get_env(:mbta, MbtaWeb.Endpoint)[:API_KEY]
    resp = HTTPoison.get!("http://realtime.mbta.com/developer/api/v2/alerts?api_key=" <> key <> "&include_access_alerts=true&include_service_alerts=true&format=json")
    data = Poison.decode!(resp.body)
    xs = data["alerts"]
    Enum.map xs, fn x ->
      x["header_text"]
    end
  end
"""
  def curLoc(session, lat, long) do
  end

  def busMove(session, bus_id, lat, long) do
  end
"""
  def pushAlert(session) do
    alerts = session.alerts
    first = [List.first(alerts)]
    newAlerts = get_alerts()
    if (!List.starts_with?(newAlerts, first)) do
      alerts = updateAlerts(newAlerts, alerts, [])
    end
    Map.put(session, :alerts, alerts)
  end

  def updateAlerts(new, old, list) do
    first = [List.first(old)]
    if (List.first(new) != nil && !List.starts_with?(new, first)) do
      update = List.first(new)
      list = [update | list]
      updateAlerts(List.delete(new, update), old, list)
    end
    Enum.reverse(list) ++ old
  end
end
