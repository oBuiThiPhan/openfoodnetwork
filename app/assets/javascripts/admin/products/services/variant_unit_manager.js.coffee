angular.module("admin.products").factory "VariantUnitManager", ->
  class VariantUnitManager
    @unitNames:
      'trọng lượng':
        1.0: 'g'
        1000.0: 'kg'
        10000.0: 'Yến'
        1000000.0: 'Tấn'
      'thể tích':
        0.001: 'ml'
        1.0: 'l'
        1000.0: 'Khối'

    @variantUnitOptions: ->
      options = for unit_type, scale_with_name of @unitNames
        unit_type_cap = unit_type[0].toUpperCase() + unit_type[1..-1]
        for scale in @unitScales(unit_type)
          name = @getUnitName(scale, unit_type)
          ["#{unit_type_cap} (#{name})", "#{unit_type}_#{scale}"]
      options.push [['Quả', 'Quả'], ['Mớ', 'mớ']]
      [].concat options...

    @getScale: (value, unitType) ->
      scaledValue = null
      validScales = []
      unitScales = VariantUnitManager.unitScales(unitType)

      validScales.unshift scale for scale in unitScales when value/scale >= 1
      if validScales.length > 0
        validScales[0]
      else
        unitScales[0]

    @getUnitName: (scale, unitType) ->
      @unitNames[unitType][scale]

    @unitScales: (unitType) ->
      (parseFloat(scale) for scale in Object.keys(@unitNames[unitType])).sort()
