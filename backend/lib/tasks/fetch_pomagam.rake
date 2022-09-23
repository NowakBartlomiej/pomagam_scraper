namespace :fetch_pomagam do
  desc "Fetching data from pomagam.pl"
  task fetch_data: :environment do
    puts "=============== start  Scraper::FetchDataService=="
    Scraper::FetchDataService.new.runner
    puts "=============== stop Scraper::FetchDataService"
  end
end