# Load the rails application
require_relative 'application'

# Initialize the rails application
Openfoodnetwork::Application.initialize!

ActiveRecord::Base.include_root_in_json = true
Encoding.default_external = Encoding::UTF_8
Encoding.default_internal = Encoding::UTF_8
