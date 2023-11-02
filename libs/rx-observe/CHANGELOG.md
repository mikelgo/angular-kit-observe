# Changelog

This file was generated using [@jscutlery/semver](https://github.com/jscutlery/semver).

## [13.0.1](https://github.com/mikelgo/angular-kit-observe/compare/rx-observe-14.0.0-rc.0...rx-observe-13.0.1) (2023-11-02)


### Bug Fixes

* **rx-observe:** fix subscription handling ([79bdbb3](https://github.com/mikelgo/angular-kit-observe/commit/79bdbb3f6bd1f15e3c8c033aaf3a22f42cb6225f))



## [14.0.1](https://github.com/mikelgo/angular-kit-observe/compare/rx-observe-14.0.0...rx-observe-14.0.1) (2023-11-02)



## [13.0.1](https://github.com/mikelgo/angular-kit-observe/compare/rx-observe-14.0.0-rc.0...rx-observe-13.0.1) (2023-11-02)


### Bug Fixes

* **rx-observe:** fix subscription handling ([c8f6aa1](https://github.com/mikelgo/angular-kit-observe/commit/c8f6aa1b890d55e6bd2be8b61941c41d8448c5c5))



## [14.0.0](https://github.com/mikelgo/angular-kit/compare/stream-2.2.3...stream-2.2.4) (2023-10-24)
### Features
* refactor to standalone directive and modern Angular features

## [12.0.0](https://github.com/mikelgo/angular-kit/compare/stream-2.2.3...stream-2.2.4) (2023-10-23)


### Bug Fixes

* **rxObserve:** remove null union from context ([37e5553](https://github.com/mikelgo/angular-kit/commit/37e55530743cf8deaf487f87eb6bb0cedfad0a3a))
* **rxObserve:** fix template context typing ([f5b4e05](https://github.com/mikelgo/angular-kit/commit/f5b4e05a5075150436f8afa2b93eb24c8a534021))
* **rxObserve:** correct peer dependency for standalone directive to 15.0.0 ([51fd99c](https://github.com/mikelgo/angular-kit/commit/51fd99c0b99239d40d21b2899752d66a9f273a4a))
* **rxObserve:** fix dependency problem causing runtime error ([87094ed](https://github.com/mikelgo/angular-kit/commit/87094ed391da24ac53126487f30c51f15e9992c0))
* **rxObserve:** handle subscription correctly ([d4c966d](https://github.com/mikelgo/angular-kit/commit/d4c966daee0ac9850573a2abaccd686b4c37497c)), closes [#69](https://github.com/mikelgo/angular-kit/issues/69)
* **rxObserve:** correct typing issue when detecting DebounceRenderStrategy ([20c0a4e](https://github.com/code-workers-io/angular-kit/commit/20c0a4ea2a8219bcc2e117b313b9b18da39c457c))
* **rxObserve:** when element is off the viewport CD should only be triggered if element is visible and value has changed ([4249cb6](https://github.com/code-workers-io/angular-kit/commit/4249cb6611509aa0167ea9f464cb5811bb0330be)), closes [#40](https://github.com/code-workers-io/angular-kit/issues/40)


### Features
* **rxObserve:** check if intersection observer API is supported if ViewPortStrategy is active; fallback do DefaultStrategy ([00296bb](https://github.com/code-workers-io/angular-kit/commit/00296bbc2e0451f2e582a6ef5322b40d29421f98))
* **rxObserve:** enhance configuration token by keepValueOnLoading, lazyViewCreation and renderStrategy option ([9512124](https://github.com/code-workers-io/angular-kit/commit/9512124c834eb434b8391e90ee76f1551c76bb2e)), closes [#33](https://github.com/code-workers-io/angular-kit/issues/33)
* **rxObserve:** implement ViewPortRenderStrategy to only run change detection when element is visible in the viewport ([95cec91](https://github.com/code-workers-io/angular-kit/commit/95cec91895554bb3311a7a99b3dddd08e8079cb8))
* **rxObserve:** introduce concept of render strategies ([d413113](https://github.com/code-workers-io/angular-kit/commit/d4131137d56ca1901a26c0e8485044b9a8334606))
* **rxObserve:** [#21](https://github.com/code-workers-io/angular-kit/issues/21) provide possibility to pass renderCallback to StreamDirective and emit respective context on render changes ([3e8b535](https://github.com/code-workers-io/angular-kit/commit/3e8b535fb8cd526731574f19989c5fc3a9ac84a1))
