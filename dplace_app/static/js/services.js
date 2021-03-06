angular.module('dplaceServices', ['ngResource'])
    .config(function($httpProvider) {
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    })
    .service('colorMapService', [ColorMapService])
    .service('searchModelService',['VariableCategory','GeographicRegion', 'LanguageFamily', 'DatasetSources', 'Language', 'colorMapService', SearchModelService])
    .factory('LanguageFamily', function($resource) {
        return $resource(
            '/api/v1/language_families/:id',
            {page_size: 1000}, {
                query: {
                    method: 'GET',
                    isArray: true,
                    transformResponse: function(data, headers) {
                        society_count = 0;
                        results = JSON.parse(data).results;
                        for (var i = 0; i < results.length; i++) {
                            society_count += results[i].language_count;
                        }
                        list = [{
                            'name': 'Select All Languages',
                            'language_count': society_count
                        }]
                        return list.concat(results);
                    }
                }
            }
        )
    })
    .factory('Language', function($resource) {
        return $resource(
            '/api/v1/languages/:id',
            {page_size: 1000}, {
                query: {
                    method: 'GET',
                    isArray: true,
                    transformResponse: function(data, headers) {
                        return JSON.parse(data).results;
                    }
                }
            }
        )
    })
    .factory('Source', function ($resource) {
        return $resource (
            '/api/v1/sources/:id',
            {page_size: 1000}, {
                query: {
                    method: 'GET',
                    isArray: true,
                    transformResponse: function(data, headers) {
                        return JSON.parse(data).results;
                    }
                }
            }
        )
    })
    .factory('Variable', function ($resource) {
        return $resource(
            '/api/v1/variables/:id',
            {page_size: 1000}, {
                query: {
                    method: 'GET',
                    isArray: true,
                    transformResponse: function(data, headers) {
                        if (!JSON.parse(data).results) {
                            return [JSON.parse(data)];
                        }                            
                            return JSON.parse(data).results;
                    }
                }
            });
    })
    .factory('VariableCategory', function ($resource) {
        return $resource(
            '/api/v1/categories/:id',
            {page_size: 1000}, {
                query: {
                    method: 'GET',
                    isArray: true,
                    transformResponse: function(data, headers) {
                        return JSON.parse(data).results;
                    }
                }
            });
    })
    .factory('CodeDescription', function ($resource) {
        return $resource(
            '/api/v1/codes/?variable=:variable',
            {page_size: 1000}, {
                query: {
                    method: 'GET',
                    isArray: true,
                    transformResponse: function(data, headers) {
                        if (!JSON.parse(data).results) {
                            return [JSON.parse(data)];
                        }
                        
                        return JSON.parse(data).results;
                    }
                }
            });
    })
    .factory('MinAndMax', function($resource) {
        return $resource(
            '/api/v1/min_and_max',
            {}, {
                query: {
                    method: 'GET',
                    isArray:false
                }
            }
        )
    })
    .factory('getCategories', function($resource) {
        return $resource(
            '/api/v1/get_categories',
            {}, {
                query: {
                    method: 'GET',
                    isArray:true
                }
            }
        )
    })
    .factory('DatasetSources', function($resource) {
        return $resource(
            '/api/v1/get_dataset_sources',
            {}, {
                query: {
                    method: 'GET',
                    isArray: true
                }
            }
        )
    })
    .factory('FindSocieties', function($resource) {
        return $resource(
            '/api/v1/find_societies',
            {},{
                find: {
                    method: 'GET',
                    transformResponse: function(data, headers) {
                        var i,
                            sources = {},
                            res = JSON.parse(data);
                        for (i = 0; i < res.sources.length; i++) {
                            sources[res.sources[i].id] = res.sources[i];
                        }
                        res.sources = sources;
                        return res;
                    }
                }
            }
        )
    })
    .factory('GeographicRegion', function ($resource) {
        return $resource(
            '/api/v1/geographic_regions/:id',
            {page_size: 1000}, {
                query: {
                    method: 'GET',
                    isArray: true,
                    transformResponse: function(data, headers) {
                        return JSON.parse(data).results;
                    }
                }
            });
    })
    
    .factory('TreesFromSocieties', function($resource) {
        return $resource(
            '/api/v1/trees_from_societies',
            {},{
                find: {
                    method: 'GET',
                    isArray: true
                }
            }
        )
    })
    ;
