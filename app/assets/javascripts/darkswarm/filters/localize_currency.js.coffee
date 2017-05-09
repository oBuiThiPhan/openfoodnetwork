Darkswarm.filter "localizeCurrency", (currencyConfig)->
  # Convert number to string currency using injected currency configuration.
  (amount) ->
    # Set country code (eg. "US").
    currency_code = if currencyConfig.display_currency then " " + currencyConfig.currency else ""
    # Set decimal points,  2 or 0 if hide_cents.
    decimals = if currencyConfig.hide_cents == "true" then 0 else 1
    # We need to use parseFloat before toFixed as the amount should come in as a string.

    amount_fixed = amount.toLocaleString(undefined, {style: 'decimal', minimunFractionDigits: 3, maxiunFractionDigits: 3})
    amount_fixed = amount_fixed.split(",").join(".") + ",0"

    # Build the final price string. TODO use spree decimal point and spacer character settings.
    if currencyConfig.symbol_position == 'before'
      currencyConfig.symbol + amount_fixed + currency_code
    else
      amount_fixed + " " + currencyConfig.symbol + currency_code
