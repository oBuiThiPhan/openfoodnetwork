# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).

# -- Spree
unless Spree::Country.find_by_name 'Australia'
  puts "[db:seed] Seeding Spree"
  Spree::Core::Engine.load_seed if defined?(Spree::Core)
  Spree::Auth::Engine.load_seed if defined?(Spree::Auth)
end

# -- States
unless Spree::State.find_by_name 'Victoria'
  country = Spree::Country.find_by_name('Viet Nam')
  puts "[db:seed] Seeding states"

  [
   ['Hà Nội', 'Hà Nội'],
   ['Hà Giang', 'Hà Giang'],
   ['Cao Bằng', 'Cao Bằng'],
   ['Bắc Kạn', 'Bắc Kạn'],
   ['Tuyên Quang', 'Tuyên Quang'],
   ['Lào Cai', 'Lào Cai'],
   ['Lai Châu', 'Lai Châu'],
   ['Điện Biên', 'Điện Biên'],
   ['Sơn La', 'Sơn La'],
   ['Yên Bái', 'Yên Bái'],
   ['Hòa Bình', 'Hòa Bình'],
   ['Thái Nguyên', 'Thái Nguyên'],
   ['Lạng Sơn', 'Lạng Sơn'],
   ['Quảng Ninh', 'Quảng Ninh'],
   ['Bắc Giang', 'Bắc Giang'],
   ['Phú Thọ', 'Phú Thọ'],
   ['Vĩnh Phúc', 'Vĩnh Phúc'],
   ['Bắc Ninh', 'Bắc Ninh'],
   ['Hải Dương', 'Hải Dương'],
   ['Hải Phòng', 'Hải Phòng'],
   ['Hưng Yên', 'Hưng Yên'],
   ['Thái Bình', 'Thái Bình'],
   ['Hà Nam', 'Hà Nam'],
   ['Nam Định', 'Nam Định'],
   ['Ninh Bình', 'Ninh Bình'],
   ['Thanh Hóa', 'Thanh Hóa'],
   ['Nghệ An', 'Nghệ An'],
   ['Hà Tĩnh', 'Hà Tĩnh'],
   ['Quảng Bình', 'Quảng Bình'],
   ['Quảng Trị', 'Quảng Trị'],
   ['Huế', 'Huế'],
   ['Đà Nẵng', 'Đà Nẵng'],
   ['Quảng Nam', 'Quảng Nam'],
   ['Quảng Ngãi', 'Quảng Ngãi'],
   ['Bình Định', 'Bình Định'],
   ['Phú Yên', 'Phú Yên'],
   ['Khánh Hòa', 'Khánh Hòa'],
   ['Ninh Thuận', 'Ninh Thuận'],
   ['Bình Thuận', 'Bình Thuận'],
   ['Kon Tum', 'Kon Tum'],
   ['Gia Lai', 'Gia Lai'],
   ['Đắk Lắk', 'Đắk Lắk'],
   ['Đắk Nông', 'Đắk Nông'],
   ['Lâm Đồng', 'Lâm Đồng'],
   ['Bình Phước', 'Bình Phước'],
   ['Tây Ninh', 'Tây Ninh'],
   ['Bình Dương', 'Bình Dương'],
   ['Đồng Nai', 'Đồng Nai'],
   ['Vũng Tàu', 'Vũng Tàu'],
   ['Hồ Chí Minh', 'Hồ Chí Minh'],
   ['Long An', 'Long An'],
   ['Tiền Giang', 'Tiền Giang'],
   ['Bến Tre', 'Bến Tre'],
   ['Trà Vinh', 'Trà Vinh'],
   ['Vĩnh Long', 'Vĩnh Long'],
   ['Đồng Tháp', 'Đồng Tháp'],
   ['An Giang', 'An Giang'],
   ['Kiên Giang', 'Kiên Giang'],
   ['Cần Thơ', 'Cần Thơ'],
   ['Hậu Giang', 'Hậu Giang'],
   ['Sóc Trăng', 'Sóc Trăng'],
   ['Bạc Liêu', 'Bạc Liêu'],
   ['Cà Mau', 'Cà Mau'],
  ].each do |state|
    Spree::State.create!({"name"=>state[0], "abbr"=>state[1], :country=>country}, :without_protection => true)
  end
end
