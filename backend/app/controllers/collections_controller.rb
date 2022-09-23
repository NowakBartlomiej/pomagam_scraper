class CollectionsController < ApplicationController
  def index
    # @pagy, @collections = pagy(Collection.all)
    #  @collections = Collection.all.limit(5)
    @collections = Collection.all

    render json: @collections
  end
end
