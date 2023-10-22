# Changelog

This file was generated using [@jscutlery/semver](https://github.com/jscutlery/semver).

# [12.0.0](https://github.com/mikelgo/angular-kit/compare/observe-11.0.0...observe-12.0.0) (2023-10-21)



# [11.0.0](https://github.com/mikelgo/angular-kit/compare/observe-11.0.0-alpha.3...observe-11.0.0) (2023-10-21)



# [11.0.0-alpha.2](https://github.com/mikelgo/angular-kit/compare/observe-11.0.0-alpha.1...observe-11.0.0-alpha.2) (2023-10-21)



# [11.0.0-alpha.1](https://github.com/mikelgo/angular-kit/compare/observe-11.0.0-alpha.0...observe-11.0.0-alpha.1) (2023-10-21)



# [11.0.0-alpha.0](https://github.com/mikelgo/angular-kit/compare/observe-10.0.0...observe-11.0.0-alpha.0) (2023-10-21)



## [1.0.0](https://github.com/mikelgo/angular-kit/compare/stream-2.2.3...stream-2.2.4) (2023-10-20)


### Bug Fixes

* **stream:** remove null union from context ([37e5553](https://github.com/mikelgo/angular-kit/commit/37e55530743cf8deaf487f87eb6bb0cedfad0a3a))
* **stream:** fix template context typing ([f5b4e05](https://github.com/mikelgo/angular-kit/commit/f5b4e05a5075150436f8afa2b93eb24c8a534021))
* **stream:** correct peer dependency for standalone directive to 15.0.0 ([51fd99c](https://github.com/mikelgo/angular-kit/commit/51fd99c0b99239d40d21b2899752d66a9f273a4a))
* **stream:** fix dependency problem causing runtime error ([87094ed](https://github.com/mikelgo/angular-kit/commit/87094ed391da24ac53126487f30c51f15e9992c0))
* **stream:** handle subscription correctly ([d4c966d](https://github.com/mikelgo/angular-kit/commit/d4c966daee0ac9850573a2abaccd686b4c37497c)), closes [#69](https://github.com/mikelgo/angular-kit/issues/69)
* **stream:** correct typing issue when detecting DebounceRenderStrategy ([20c0a4e](https://github.com/code-workers-io/angular-kit/commit/20c0a4ea2a8219bcc2e117b313b9b18da39c457c))
* **stream:** when element is off the viewport CD should only be triggered if element is visible and value has changed ([4249cb6](https://github.com/code-workers-io/angular-kit/commit/4249cb6611509aa0167ea9f464cb5811bb0330be)), closes [#40](https://github.com/code-workers-io/angular-kit/issues/40)


### Features
* **stream:** check if intersection observer API is supported if ViewPortStrategy is active; fallback do DefaultStrategy ([00296bb](https://github.com/code-workers-io/angular-kit/commit/00296bbc2e0451f2e582a6ef5322b40d29421f98))
* **stream:** enhance configuration token by keepValueOnLoading, lazyViewCreation and renderStrategy option ([9512124](https://github.com/code-workers-io/angular-kit/commit/9512124c834eb434b8391e90ee76f1551c76bb2e)), closes [#33](https://github.com/code-workers-io/angular-kit/issues/33)
* **stream:** implement ViewPortRenderStrategy to only run change detection when element is visible in the viewport ([95cec91](https://github.com/code-workers-io/angular-kit/commit/95cec91895554bb3311a7a99b3dddd08e8079cb8))
* **stream:** introduce concept of render strategies ([d413113](https://github.com/code-workers-io/angular-kit/commit/d4131137d56ca1901a26c0e8485044b9a8334606))
* **stream:** [#21](https://github.com/code-workers-io/angular-kit/issues/21) provide possibility to pass renderCallback to StreamDirective and emit respective context on render changes ([3e8b535](https://github.com/code-workers-io/angular-kit/commit/3e8b535fb8cd526731574f19989c5fc3a9ac84a1))
