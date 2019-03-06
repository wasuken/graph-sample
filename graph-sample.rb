require 'sinatra'
require 'csv'
require 'json'

get '/api/v1/player/:year/:player_type' do
  year = params['year'] == '18' ? '' : "_#{params['year']}"
  player_type = params['player_type'] =~ /b/ ? 'batter' : 'pitcher'
  p "./players/#{player_type}s/#{player_type}#{year}.csv"
  headers, *player_datas =
           CSV.read("./players/#{player_type}s/#{player_type}#{year}.csv")
  result = []
  player_datas.map do |player_data|
    data = {}
    player_data.each_with_index do |player_col, i|
      data[headers[i]] = player_col
    end
    result << data
  end
  result.to_json
end

get '/' do
  @title = 'graph-sample'
  erb :index
end
