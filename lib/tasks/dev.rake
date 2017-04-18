
namespace :openfoodnetwork do

  namespace :dev do

    desc 'load sample data'
    task :load_sample_data => :environment do
      require_relative '../../spec/factories'
      require_relative '../../spec/support/spree/init'
      task_name = "openfoodnetwork:dev:load_sample_data"

      # -- Shipping / payment information
      unless Spree::Zone.find_by_name 'Viet Nam'
        puts "[#{task_name}] Seeding shipping / payment information"
        zone = FactoryGirl.create(:zone, :name => 'Viet Nam', :zone_members => [])
        country = Spree::Country.find_by_name('Viet Nam')
        Spree::ZoneMember.create(:zone => zone, :zoneable => country)
        FactoryGirl.create(:shipping_method, :zone => zone)
      end

      # -- Taxonomies
      unless Spree::Taxonomy.find_by_name 'Sản phẩm'
        puts "[#{task_name}] Seeding taxonomies"
        taxonomy = Spree::Taxonomy.find_by_name('Sản phẩm') || FactoryGirl.create(:taxonomy, :name => 'Sản phẩm')
        taxonomy_root = taxonomy.root

        ['Rau củ', 'Hoa quả', 'Mứt và gia vị', 'Bơ và sữa', 'Thịt và cá'].each do |taxon_name|
          FactoryGirl.create(:taxon, :name => taxon_name, :parent_id => taxonomy_root.id)
        end
      end

      # -- Addresses
      unless Spree::Address.find_by_zipcode "426673"
        puts "[#{task_name}] Seeding addresses"

        FactoryGirl.create(:address, :address1 => "Thôn Đồng Liêu, Nghĩa Hưng", :zipcode => "426673", :city => "Nam Định")
        FactoryGirl.create(:address, :address1 => "Xóm 13, Nghĩa Phú", :zipcode => "426783", :city => "Nam Định")
        FactoryGirl.create(:address, :address1 => "Đội 9, Nghĩa Hồng", :zipcode => "426690", :city => "Nam Định")
        FactoryGirl.create(:address, :address1 => "Thôn Phú Giáo, Nghĩa Hải", :zipcode => "426971", :city => "Nam Định")
        FactoryGirl.create(:address, :address1 => "Khu Đông Bình, Rạng Đông", :zipcode => "426931", :city => "Nam Định")
        FactoryGirl.create(:address, :address1 => "Thạnh Lộc, Thạnh Hòa, Châu Thành", :zipcode => "923061", :city => "Kiên Giang")
        FactoryGirl.create(:address, :address1 => "Thôn 4, Thạch Thành", :zipcode => "447354", :city => "Thanh Hóa")
        FactoryGirl.create(:address, :address1 => "Thôn Sài Thị, Khoái Châu", :zipcode => "162721", :city => "Hưng Yên")
        FactoryGirl.create(:address, :address1 => "Thôn Đồng La, Yên Mỹ", :zipcode => "162967", :city => "Hưng Yên")
      end

      # -- Enterprises
      unless Enterprise.count > 1
        puts "[#{task_name}] Seeding enterprises"

        # FactoryGirl.create(:supplier_enterprise, :address => Spree::Address.find_by_zipcode("426673"))

        FactoryGirl.create(:distributor_enterprise, :name => "Vườn Rau Cô Lan", :address => Spree::Address.find_by_zipcode("426783"))
        FactoryGirl.create(:distributor_enterprise, :name => "Vườn Rau Bà Hồng", :address => Spree::Address.find_by_zipcode("426690"))
        FactoryGirl.create(:distributor_enterprise, :name => "Thôn Phú Giáo", :address => Spree::Address.find_by_zipcode("426971"))
        FactoryGirl.create(:distributor_enterprise, :name => "Khu Đông Bình", :address => Spree::Address.find_by_zipcode("426931"))
        FactoryGirl.create(:distributor_enterprise, :name => "Thạnh Lộc", :address => Spree::Address.find_by_zipcode("923061"))
        FactoryGirl.create(:distributor_enterprise, :name => "Thôn 4, Thạch Thành", :address => Spree::Address.find_by_zipcode("447354"))
        FactoryGirl.create(:distributor_enterprise, :name => "Thôn Sài Thị", :address => Spree::Address.find_by_zipcode("162721"))
        FactoryGirl.create(:distributor_enterprise, :name => "Thôn Đồng La", :address => Spree::Address.find_by_zipcode("162967"))
      end

      # -- Enterprise users
      unless Spree::User.count > 1
        puts "[#{task_name}] Seeding enterprise users"

        pw = "12345678"

        u = FactoryGirl.create(:user, email: "phanbt@gmail.com", password: pw, password_confirmation: pw)
        u.enterprises << Enterprise.is_primary_producer.first
        u.enterprises << Enterprise.is_primary_producer.second
        puts "  Supplier User created:    #{u.email}/#{pw}  (" + u.enterprise_roles.map{ |er| er.enterprise.name}.join(", ") + ")"

        u = FactoryGirl.create(:user, email: "hanhtt@gmail.com", password: pw, password_confirmation: pw)
        u.enterprises << Enterprise.is_distributor.first
        u.enterprises << Enterprise.is_distributor.second
        puts "  Distributor User created: #{u.email}/#{pw} (" + u.enterprise_roles.map{ |er| er.enterprise.name}.join(", ") + ")"
      end

      # -- Enterprise fees
      unless EnterpriseFee.count > 1
        Enterprise.is_distributor.each do |distributor|
          FactoryGirl.create(:enterprise_fee, enterprise: distributor)
        end
      end

      # -- Enterprise Payment Methods
      unless Spree::PaymentMethod.count > 1
        Enterprise.is_distributor.each do |distributor|
          FactoryGirl.create(:payment_method, distributors: [distributor], name: "Cheque (#{distributor.name})", :environment => 'development')
        end
      end

      # -- Products
      # unless Spree::Product.count > 0
      #   puts "[#{task_name}] Seeding products"

      #   prod1 = FactoryGirl.create(:product,
      #                      :name => 'Garlic', :price => 20.00,
      #                      :supplier => Enterprise.is_primary_producer[0],
      #                      :taxons => [Spree::Taxon.find_by_name('Rau củ')])

      #   ProductDistribution.create(:product => prod1,
      #                              :distributor => Enterprise.is_distributor[0],
      #                              :enterprise_fee => Enterprise.is_distributor[0].enterprise_fees.first)


      #   prod2 = FactoryGirl.create(:product,
      #                      :name => 'Fuji Apple', :price => 5.00,
      #                      :supplier => Enterprise.is_primary_producer[1],
      #                      :taxons => [Spree::Taxon.find_by_name('Rau củ')])

      #   ProductDistribution.create(:product => prod2,
      #                              :distributor => Enterprise.is_distributor[1],
      #                              :enterprise_fee => Enterprise.is_distributor[1].enterprise_fees.first)

      #   prod3 = FactoryGirl.create(:product,
      #                      :name => 'Beef - 5kg Trays', :price => 50.00,
      #                      :supplier => Enterprise.is_primary_producer[2],
      #                      :taxons => [Spree::Taxon.find_by_name('Rau củ')])

      #   ProductDistribution.create(:product => prod3,
      #                              :distributor => Enterprise.is_distributor[2],
      #                              :enterprise_fee => Enterprise.is_distributor[2].enterprise_fees.first)
      # end
    end
  end
end
