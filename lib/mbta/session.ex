defmodule Mbta.Session do
  def new do
    %{
      curLoc: nil,
      alerts: get_alerts(),
      direction: 0,
      stop_id: nil,
      bus_makers: nil
    }
  end

  def client_view(session) do
    %{
      alerts: get_alerts()
    }
  end

  # returns map of alerts concerning all of mbta transit
  # TODO: affected_services == bus, severity notice maybe
  def get_alerts() do
    key = Application.get_env(:mbta, MbtaWeb.Endpoint)[:API_KEY]
    resp = HTTPoison.get!("http://realtime.mbta.com/developer/api/v2/alerts?api_key=" <> key <> "&include_access_alerts=true&include_service_alerts=true&format=json")
    data = Poison.decode!(resp.body)
    alerts = data["alerts"]
    Enum.map(
      Enum.filter(alerts, fn(alert) ->
        Enum.find(alert["affected_services"]["services"], fn(s_affected) ->
          s_affected["mode_name"] == "Bus"
        end)
      end), 
      fn(alert) ->
        %{text: alert["header_text"], severity: alert["severity"]}
    end)
  end

  def curLoc(session, lat, long) do
    Map.put(session, :curLoc, [lat, long])
  end

  # bus_markers = [[1, [0.1,0.2]], [2, [0.2, 0.3]]]
  # UPDATES TO BUS FROM ROUTES OF A PARTICULAR BUS STATION
  def busMove(session, route_id, lat, long) do
    curBuses = session.bus_markers
    bus = List.find(curBuses, List.starts_with?(route_id)) 
    if bus do
      updatedBuses = List.replace(curBuses, bus, [route_id, [lat, long]])
    end
    Map.put(session, :bus_markers, updatedBuses)
  end

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
