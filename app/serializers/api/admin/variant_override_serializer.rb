class Api::Admin::VariantOverrideSerializer < ActiveModel::Serializer
  attributes :id, :hub_id, :variant_id, :sku, :price, :count_on_hand, :on_demand, :default_stock, :resettable
  attributes :tag_list, :tags

  def tag_list
    object.tag_list.join(",") if object.tag_list
  end

  def tags
    object.tag_list.map { |t| { text: t } } if object.tag_list
  end
end
