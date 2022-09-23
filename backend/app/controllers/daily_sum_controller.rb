class DailySumController < ApplicationController
  def index
    @pagy, @daily_sum = pagy(DailySummary.all)
    @daily_sum = DailySummary.order('created_at DESC')

    render json:@daily_sum
  end
end
