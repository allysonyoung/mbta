# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Mbta.Repo.insert!(%Mbta.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias Mbta.Repo
alias Mbta.Accounts.User

Repo.delete_all(User)

Repo.insert!(%User{email: "admin@example.com", name: "Admin", password: "mbtaadmin", password_confirmation: "mbtaadmin", password_hash: Comeonin.Argon2.hashpwsalt("mbtaadmin")})
