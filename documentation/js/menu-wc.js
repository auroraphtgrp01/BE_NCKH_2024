'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">NCKH2024 documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-4ffb69d6c3fb18913608628ce5a10459ed6d2a9f3ace7410b3551a508b657223b08b78e5116fefd2081594b04a9397e85116922e91d2606d464e9870ccb433a0"' : 'data-bs-target="#xs-controllers-links-module-AppModule-4ffb69d6c3fb18913608628ce5a10459ed6d2a9f3ace7410b3551a508b657223b08b78e5116fefd2081594b04a9397e85116922e91d2606d464e9870ccb433a0"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-4ffb69d6c3fb18913608628ce5a10459ed6d2a9f3ace7410b3551a508b657223b08b78e5116fefd2081594b04a9397e85116922e91d2606d464e9870ccb433a0"' :
                                            'id="xs-controllers-links-module-AppModule-4ffb69d6c3fb18913608628ce5a10459ed6d2a9f3ace7410b3551a508b657223b08b78e5116fefd2081594b04a9397e85116922e91d2606d464e9870ccb433a0"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-4ffb69d6c3fb18913608628ce5a10459ed6d2a9f3ace7410b3551a508b657223b08b78e5116fefd2081594b04a9397e85116922e91d2606d464e9870ccb433a0"' : 'data-bs-target="#xs-injectables-links-module-AppModule-4ffb69d6c3fb18913608628ce5a10459ed6d2a9f3ace7410b3551a508b657223b08b78e5116fefd2081594b04a9397e85116922e91d2606d464e9870ccb433a0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-4ffb69d6c3fb18913608628ce5a10459ed6d2a9f3ace7410b3551a508b657223b08b78e5116fefd2081594b04a9397e85116922e91d2606d464e9870ccb433a0"' :
                                        'id="xs-injectables-links-module-AppModule-4ffb69d6c3fb18913608628ce5a10459ed6d2a9f3ace7410b3551a508b657223b08b78e5116fefd2081594b04a9397e85116922e91d2606d464e9870ccb433a0"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-e5adade27370ebfc5a04e1ac813d2e04074c7f3e680163297a0d111bbcd83e18d704561c388271d717e1154d686ffba2eb40a425cac68400a1b80290a3fc12c6"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-e5adade27370ebfc5a04e1ac813d2e04074c7f3e680163297a0d111bbcd83e18d704561c388271d717e1154d686ffba2eb40a425cac68400a1b80290a3fc12c6"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-e5adade27370ebfc5a04e1ac813d2e04074c7f3e680163297a0d111bbcd83e18d704561c388271d717e1154d686ffba2eb40a425cac68400a1b80290a3fc12c6"' :
                                            'id="xs-controllers-links-module-AuthModule-e5adade27370ebfc5a04e1ac813d2e04074c7f3e680163297a0d111bbcd83e18d704561c388271d717e1154d686ffba2eb40a425cac68400a1b80290a3fc12c6"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-e5adade27370ebfc5a04e1ac813d2e04074c7f3e680163297a0d111bbcd83e18d704561c388271d717e1154d686ffba2eb40a425cac68400a1b80290a3fc12c6"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-e5adade27370ebfc5a04e1ac813d2e04074c7f3e680163297a0d111bbcd83e18d704561c388271d717e1154d686ffba2eb40a425cac68400a1b80290a3fc12c6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-e5adade27370ebfc5a04e1ac813d2e04074c7f3e680163297a0d111bbcd83e18d704561c388271d717e1154d686ffba2eb40a425cac68400a1b80290a3fc12c6"' :
                                        'id="xs-injectables-links-module-AuthModule-e5adade27370ebfc5a04e1ac813d2e04074c7f3e680163297a0d111bbcd83e18d704561c388271d717e1154d686ffba2eb40a425cac68400a1b80290a3fc12c6"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ContractAttributesModule.html" data-type="entity-link" >ContractAttributesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ContractAttributesModule-66ce1a388a4dbf8015304db475c5bffb0c9f5de579eb6f30976c2c6f94acb48d565e874cc9a6f7402e974c99b8e445f5aa1b567d99ed6fdbcd512ba350ed25a5"' : 'data-bs-target="#xs-controllers-links-module-ContractAttributesModule-66ce1a388a4dbf8015304db475c5bffb0c9f5de579eb6f30976c2c6f94acb48d565e874cc9a6f7402e974c99b8e445f5aa1b567d99ed6fdbcd512ba350ed25a5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ContractAttributesModule-66ce1a388a4dbf8015304db475c5bffb0c9f5de579eb6f30976c2c6f94acb48d565e874cc9a6f7402e974c99b8e445f5aa1b567d99ed6fdbcd512ba350ed25a5"' :
                                            'id="xs-controllers-links-module-ContractAttributesModule-66ce1a388a4dbf8015304db475c5bffb0c9f5de579eb6f30976c2c6f94acb48d565e874cc9a6f7402e974c99b8e445f5aa1b567d99ed6fdbcd512ba350ed25a5"' }>
                                            <li class="link">
                                                <a href="controllers/ContractAttributesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ContractAttributesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ContractAttributesModule-66ce1a388a4dbf8015304db475c5bffb0c9f5de579eb6f30976c2c6f94acb48d565e874cc9a6f7402e974c99b8e445f5aa1b567d99ed6fdbcd512ba350ed25a5"' : 'data-bs-target="#xs-injectables-links-module-ContractAttributesModule-66ce1a388a4dbf8015304db475c5bffb0c9f5de579eb6f30976c2c6f94acb48d565e874cc9a6f7402e974c99b8e445f5aa1b567d99ed6fdbcd512ba350ed25a5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ContractAttributesModule-66ce1a388a4dbf8015304db475c5bffb0c9f5de579eb6f30976c2c6f94acb48d565e874cc9a6f7402e974c99b8e445f5aa1b567d99ed6fdbcd512ba350ed25a5"' :
                                        'id="xs-injectables-links-module-ContractAttributesModule-66ce1a388a4dbf8015304db475c5bffb0c9f5de579eb6f30976c2c6f94acb48d565e874cc9a6f7402e974c99b8e445f5aa1b567d99ed6fdbcd512ba350ed25a5"' }>
                                        <li class="link">
                                            <a href="injectables/CommonService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CommonService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ContractAttributesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ContractAttributesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ContractAttributeValuesModule.html" data-type="entity-link" >ContractAttributeValuesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ContractAttributeValuesModule-46a380e87d7e2d86fe1192cbe9aa42daa5cf915d49d3b64c48e5bf38f30c314f2650d9f6fd229caf3470c56d3474ea6c391f6e3639b4a694a07edffa426a01c2"' : 'data-bs-target="#xs-controllers-links-module-ContractAttributeValuesModule-46a380e87d7e2d86fe1192cbe9aa42daa5cf915d49d3b64c48e5bf38f30c314f2650d9f6fd229caf3470c56d3474ea6c391f6e3639b4a694a07edffa426a01c2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ContractAttributeValuesModule-46a380e87d7e2d86fe1192cbe9aa42daa5cf915d49d3b64c48e5bf38f30c314f2650d9f6fd229caf3470c56d3474ea6c391f6e3639b4a694a07edffa426a01c2"' :
                                            'id="xs-controllers-links-module-ContractAttributeValuesModule-46a380e87d7e2d86fe1192cbe9aa42daa5cf915d49d3b64c48e5bf38f30c314f2650d9f6fd229caf3470c56d3474ea6c391f6e3639b4a694a07edffa426a01c2"' }>
                                            <li class="link">
                                                <a href="controllers/ContractAttributeValuesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ContractAttributeValuesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ContractAttributeValuesModule-46a380e87d7e2d86fe1192cbe9aa42daa5cf915d49d3b64c48e5bf38f30c314f2650d9f6fd229caf3470c56d3474ea6c391f6e3639b4a694a07edffa426a01c2"' : 'data-bs-target="#xs-injectables-links-module-ContractAttributeValuesModule-46a380e87d7e2d86fe1192cbe9aa42daa5cf915d49d3b64c48e5bf38f30c314f2650d9f6fd229caf3470c56d3474ea6c391f6e3639b4a694a07edffa426a01c2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ContractAttributeValuesModule-46a380e87d7e2d86fe1192cbe9aa42daa5cf915d49d3b64c48e5bf38f30c314f2650d9f6fd229caf3470c56d3474ea6c391f6e3639b4a694a07edffa426a01c2"' :
                                        'id="xs-injectables-links-module-ContractAttributeValuesModule-46a380e87d7e2d86fe1192cbe9aa42daa5cf915d49d3b64c48e5bf38f30c314f2650d9f6fd229caf3470c56d3474ea6c391f6e3639b4a694a07edffa426a01c2"' }>
                                        <li class="link">
                                            <a href="injectables/CommonService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CommonService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ContractAttributeValuesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ContractAttributeValuesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ContractPartyInfosModule.html" data-type="entity-link" >ContractPartyInfosModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ContractPartyInfosModule-31a216baf9b4a92f063020420c60affea6d410dc02a119627f4e731d30f71f74e804c44064442d7aa9de9b3aac362b500c82f82901033dbb00897c3dafa80fba"' : 'data-bs-target="#xs-controllers-links-module-ContractPartyInfosModule-31a216baf9b4a92f063020420c60affea6d410dc02a119627f4e731d30f71f74e804c44064442d7aa9de9b3aac362b500c82f82901033dbb00897c3dafa80fba"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ContractPartyInfosModule-31a216baf9b4a92f063020420c60affea6d410dc02a119627f4e731d30f71f74e804c44064442d7aa9de9b3aac362b500c82f82901033dbb00897c3dafa80fba"' :
                                            'id="xs-controllers-links-module-ContractPartyInfosModule-31a216baf9b4a92f063020420c60affea6d410dc02a119627f4e731d30f71f74e804c44064442d7aa9de9b3aac362b500c82f82901033dbb00897c3dafa80fba"' }>
                                            <li class="link">
                                                <a href="controllers/ContractPartyInfosController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ContractPartyInfosController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ContractPartyInfosModule-31a216baf9b4a92f063020420c60affea6d410dc02a119627f4e731d30f71f74e804c44064442d7aa9de9b3aac362b500c82f82901033dbb00897c3dafa80fba"' : 'data-bs-target="#xs-injectables-links-module-ContractPartyInfosModule-31a216baf9b4a92f063020420c60affea6d410dc02a119627f4e731d30f71f74e804c44064442d7aa9de9b3aac362b500c82f82901033dbb00897c3dafa80fba"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ContractPartyInfosModule-31a216baf9b4a92f063020420c60affea6d410dc02a119627f4e731d30f71f74e804c44064442d7aa9de9b3aac362b500c82f82901033dbb00897c3dafa80fba"' :
                                        'id="xs-injectables-links-module-ContractPartyInfosModule-31a216baf9b4a92f063020420c60affea6d410dc02a119627f4e731d30f71f74e804c44064442d7aa9de9b3aac362b500c82f82901033dbb00897c3dafa80fba"' }>
                                        <li class="link">
                                            <a href="injectables/ContractPartyInfosService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ContractPartyInfosService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ContractsModule.html" data-type="entity-link" >ContractsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ContractsModule-06b6d873b5a578b69d432cebc85c9fd5ce07d6c1d5fbeafeeeaf2d4384f5c596df4bb63ef500b3d0773610cc0465754a4e8313a17f107ccea36e9a2ade3b63ad"' : 'data-bs-target="#xs-controllers-links-module-ContractsModule-06b6d873b5a578b69d432cebc85c9fd5ce07d6c1d5fbeafeeeaf2d4384f5c596df4bb63ef500b3d0773610cc0465754a4e8313a17f107ccea36e9a2ade3b63ad"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ContractsModule-06b6d873b5a578b69d432cebc85c9fd5ce07d6c1d5fbeafeeeaf2d4384f5c596df4bb63ef500b3d0773610cc0465754a4e8313a17f107ccea36e9a2ade3b63ad"' :
                                            'id="xs-controllers-links-module-ContractsModule-06b6d873b5a578b69d432cebc85c9fd5ce07d6c1d5fbeafeeeaf2d4384f5c596df4bb63ef500b3d0773610cc0465754a4e8313a17f107ccea36e9a2ade3b63ad"' }>
                                            <li class="link">
                                                <a href="controllers/ContractsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ContractsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ContractsModule-06b6d873b5a578b69d432cebc85c9fd5ce07d6c1d5fbeafeeeaf2d4384f5c596df4bb63ef500b3d0773610cc0465754a4e8313a17f107ccea36e9a2ade3b63ad"' : 'data-bs-target="#xs-injectables-links-module-ContractsModule-06b6d873b5a578b69d432cebc85c9fd5ce07d6c1d5fbeafeeeaf2d4384f5c596df4bb63ef500b3d0773610cc0465754a4e8313a17f107ccea36e9a2ade3b63ad"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ContractsModule-06b6d873b5a578b69d432cebc85c9fd5ce07d6c1d5fbeafeeeaf2d4384f5c596df4bb63ef500b3d0773610cc0465754a4e8313a17f107ccea36e9a2ade3b63ad"' :
                                        'id="xs-injectables-links-module-ContractsModule-06b6d873b5a578b69d432cebc85c9fd5ce07d6c1d5fbeafeeeaf2d4384f5c596df4bb63ef500b3d0773610cc0465754a4e8313a17f107ccea36e9a2ade3b63ad"' }>
                                        <li class="link">
                                            <a href="injectables/CommonService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CommonService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ContractsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ContractsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/InvitationsModule.html" data-type="entity-link" >InvitationsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-InvitationsModule-c8f52dc1c8976a6a0bd0b166286baa2a2d9a70279aa67d2f7484a39d269bdf5da3de40dd2654a2ed271e10e418bf5cd8aa8008b041ec6f0da4c8aabe2bbe548e"' : 'data-bs-target="#xs-controllers-links-module-InvitationsModule-c8f52dc1c8976a6a0bd0b166286baa2a2d9a70279aa67d2f7484a39d269bdf5da3de40dd2654a2ed271e10e418bf5cd8aa8008b041ec6f0da4c8aabe2bbe548e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-InvitationsModule-c8f52dc1c8976a6a0bd0b166286baa2a2d9a70279aa67d2f7484a39d269bdf5da3de40dd2654a2ed271e10e418bf5cd8aa8008b041ec6f0da4c8aabe2bbe548e"' :
                                            'id="xs-controllers-links-module-InvitationsModule-c8f52dc1c8976a6a0bd0b166286baa2a2d9a70279aa67d2f7484a39d269bdf5da3de40dd2654a2ed271e10e418bf5cd8aa8008b041ec6f0da4c8aabe2bbe548e"' }>
                                            <li class="link">
                                                <a href="controllers/InvitationsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InvitationsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-InvitationsModule-c8f52dc1c8976a6a0bd0b166286baa2a2d9a70279aa67d2f7484a39d269bdf5da3de40dd2654a2ed271e10e418bf5cd8aa8008b041ec6f0da4c8aabe2bbe548e"' : 'data-bs-target="#xs-injectables-links-module-InvitationsModule-c8f52dc1c8976a6a0bd0b166286baa2a2d9a70279aa67d2f7484a39d269bdf5da3de40dd2654a2ed271e10e418bf5cd8aa8008b041ec6f0da4c8aabe2bbe548e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-InvitationsModule-c8f52dc1c8976a6a0bd0b166286baa2a2d9a70279aa67d2f7484a39d269bdf5da3de40dd2654a2ed271e10e418bf5cd8aa8008b041ec6f0da4c8aabe2bbe548e"' :
                                        'id="xs-injectables-links-module-InvitationsModule-c8f52dc1c8976a6a0bd0b166286baa2a2d9a70279aa67d2f7484a39d269bdf5da3de40dd2654a2ed271e10e418bf5cd8aa8008b041ec6f0da4c8aabe2bbe548e"' }>
                                        <li class="link">
                                            <a href="injectables/InvitationsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InvitationsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MailModule.html" data-type="entity-link" >MailModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MailModule-d8f986a48a3732fe2c2bc3711e98f19f343b3de56118861f3287ef56d4f15c772bdbfe3de31f0de84b504e3596bab6c33dafa3ef0cf52f44180f9ec78d3245d3"' : 'data-bs-target="#xs-injectables-links-module-MailModule-d8f986a48a3732fe2c2bc3711e98f19f343b3de56118861f3287ef56d4f15c772bdbfe3de31f0de84b504e3596bab6c33dafa3ef0cf52f44180f9ec78d3245d3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MailModule-d8f986a48a3732fe2c2bc3711e98f19f343b3de56118861f3287ef56d4f15c772bdbfe3de31f0de84b504e3596bab6c33dafa3ef0cf52f44180f9ec78d3245d3"' :
                                        'id="xs-injectables-links-module-MailModule-d8f986a48a3732fe2c2bc3711e98f19f343b3de56118861f3287ef56d4f15c772bdbfe3de31f0de84b504e3596bab6c33dafa3ef0cf52f44180f9ec78d3245d3"' }>
                                        <li class="link">
                                            <a href="injectables/MailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PartiesModule.html" data-type="entity-link" >PartiesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PartiesModule-eded171742fa65e9ceb75487f0d31c79c086fd0d3408ffa708a0835d0935b1b57c6c551560045ff46cd550681bb0a97353e24b15c9dc3f58fddf79e15621f105"' : 'data-bs-target="#xs-controllers-links-module-PartiesModule-eded171742fa65e9ceb75487f0d31c79c086fd0d3408ffa708a0835d0935b1b57c6c551560045ff46cd550681bb0a97353e24b15c9dc3f58fddf79e15621f105"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PartiesModule-eded171742fa65e9ceb75487f0d31c79c086fd0d3408ffa708a0835d0935b1b57c6c551560045ff46cd550681bb0a97353e24b15c9dc3f58fddf79e15621f105"' :
                                            'id="xs-controllers-links-module-PartiesModule-eded171742fa65e9ceb75487f0d31c79c086fd0d3408ffa708a0835d0935b1b57c6c551560045ff46cd550681bb0a97353e24b15c9dc3f58fddf79e15621f105"' }>
                                            <li class="link">
                                                <a href="controllers/PartiesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PartiesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PartiesModule-eded171742fa65e9ceb75487f0d31c79c086fd0d3408ffa708a0835d0935b1b57c6c551560045ff46cd550681bb0a97353e24b15c9dc3f58fddf79e15621f105"' : 'data-bs-target="#xs-injectables-links-module-PartiesModule-eded171742fa65e9ceb75487f0d31c79c086fd0d3408ffa708a0835d0935b1b57c6c551560045ff46cd550681bb0a97353e24b15c9dc3f58fddf79e15621f105"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PartiesModule-eded171742fa65e9ceb75487f0d31c79c086fd0d3408ffa708a0835d0935b1b57c6c551560045ff46cd550681bb0a97353e24b15c9dc3f58fddf79e15621f105"' :
                                        'id="xs-injectables-links-module-PartiesModule-eded171742fa65e9ceb75487f0d31c79c086fd0d3408ffa708a0835d0935b1b57c6c551560045ff46cd550681bb0a97353e24b15c9dc3f58fddf79e15621f105"' }>
                                        <li class="link">
                                            <a href="injectables/PartiesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PartiesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PartyInfosModule.html" data-type="entity-link" >PartyInfosModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PartyInfosModule-632538b84be697707b100c169911cb9f9a005e6e483f4c5a33835104d7c0b9dabfc2d40c6ea7b0ea7d48ef4fe3d258b159597b48c84e66163781dc05bd4879d1"' : 'data-bs-target="#xs-controllers-links-module-PartyInfosModule-632538b84be697707b100c169911cb9f9a005e6e483f4c5a33835104d7c0b9dabfc2d40c6ea7b0ea7d48ef4fe3d258b159597b48c84e66163781dc05bd4879d1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PartyInfosModule-632538b84be697707b100c169911cb9f9a005e6e483f4c5a33835104d7c0b9dabfc2d40c6ea7b0ea7d48ef4fe3d258b159597b48c84e66163781dc05bd4879d1"' :
                                            'id="xs-controllers-links-module-PartyInfosModule-632538b84be697707b100c169911cb9f9a005e6e483f4c5a33835104d7c0b9dabfc2d40c6ea7b0ea7d48ef4fe3d258b159597b48c84e66163781dc05bd4879d1"' }>
                                            <li class="link">
                                                <a href="controllers/PartyInfosController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PartyInfosController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PartyInfosModule-632538b84be697707b100c169911cb9f9a005e6e483f4c5a33835104d7c0b9dabfc2d40c6ea7b0ea7d48ef4fe3d258b159597b48c84e66163781dc05bd4879d1"' : 'data-bs-target="#xs-injectables-links-module-PartyInfosModule-632538b84be697707b100c169911cb9f9a005e6e483f4c5a33835104d7c0b9dabfc2d40c6ea7b0ea7d48ef4fe3d258b159597b48c84e66163781dc05bd4879d1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PartyInfosModule-632538b84be697707b100c169911cb9f9a005e6e483f4c5a33835104d7c0b9dabfc2d40c6ea7b0ea7d48ef4fe3d258b159597b48c84e66163781dc05bd4879d1"' :
                                        'id="xs-injectables-links-module-PartyInfosModule-632538b84be697707b100c169911cb9f9a005e6e483f4c5a33835104d7c0b9dabfc2d40c6ea7b0ea7d48ef4fe3d258b159597b48c84e66163781dc05bd4879d1"' }>
                                        <li class="link">
                                            <a href="injectables/PartyInfosService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PartyInfosService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/QueueRedisModule.html" data-type="entity-link" >QueueRedisModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-QueueRedisModule-df3b133dc0917cd40e6edc95a9ac24443a3c652f23a6acdc3deac3060cf2a030e177a267339bd9356f366569b15ad7ede8ec4f3844117999bfbf7f02842b4e3b"' : 'data-bs-target="#xs-injectables-links-module-QueueRedisModule-df3b133dc0917cd40e6edc95a9ac24443a3c652f23a6acdc3deac3060cf2a030e177a267339bd9356f366569b15ad7ede8ec4f3844117999bfbf7f02842b4e3b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-QueueRedisModule-df3b133dc0917cd40e6edc95a9ac24443a3c652f23a6acdc3deac3060cf2a030e177a267339bd9356f366569b15ad7ede8ec4f3844117999bfbf7f02842b4e3b"' :
                                        'id="xs-injectables-links-module-QueueRedisModule-df3b133dc0917cd40e6edc95a9ac24443a3c652f23a6acdc3deac3060cf2a030e177a267339bd9356f366569b15ad7ede8ec4f3844117999bfbf7f02842b4e3b"' }>
                                        <li class="link">
                                            <a href="injectables/QueueRedisService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >QueueRedisService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SmartContractsModule.html" data-type="entity-link" >SmartContractsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-SmartContractsModule-80014f660bbf7ba3a910fa108c492556ad8ca356939df5e2f910d0946a2fd90c5bf1f643eae0412c29fd67d8341f06942b56bf45555a5dd1ba25a35a32a4e3cb"' : 'data-bs-target="#xs-controllers-links-module-SmartContractsModule-80014f660bbf7ba3a910fa108c492556ad8ca356939df5e2f910d0946a2fd90c5bf1f643eae0412c29fd67d8341f06942b56bf45555a5dd1ba25a35a32a4e3cb"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SmartContractsModule-80014f660bbf7ba3a910fa108c492556ad8ca356939df5e2f910d0946a2fd90c5bf1f643eae0412c29fd67d8341f06942b56bf45555a5dd1ba25a35a32a4e3cb"' :
                                            'id="xs-controllers-links-module-SmartContractsModule-80014f660bbf7ba3a910fa108c492556ad8ca356939df5e2f910d0946a2fd90c5bf1f643eae0412c29fd67d8341f06942b56bf45555a5dd1ba25a35a32a4e3cb"' }>
                                            <li class="link">
                                                <a href="controllers/SmartContractsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SmartContractsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SmartContractsModule-80014f660bbf7ba3a910fa108c492556ad8ca356939df5e2f910d0946a2fd90c5bf1f643eae0412c29fd67d8341f06942b56bf45555a5dd1ba25a35a32a4e3cb"' : 'data-bs-target="#xs-injectables-links-module-SmartContractsModule-80014f660bbf7ba3a910fa108c492556ad8ca356939df5e2f910d0946a2fd90c5bf1f643eae0412c29fd67d8341f06942b56bf45555a5dd1ba25a35a32a4e3cb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SmartContractsModule-80014f660bbf7ba3a910fa108c492556ad8ca356939df5e2f910d0946a2fd90c5bf1f643eae0412c29fd67d8341f06942b56bf45555a5dd1ba25a35a32a4e3cb"' :
                                        'id="xs-injectables-links-module-SmartContractsModule-80014f660bbf7ba3a910fa108c492556ad8ca356939df5e2f910d0946a2fd90c5bf1f643eae0412c29fd67d8341f06942b56bf45555a5dd1ba25a35a32a4e3cb"' }>
                                        <li class="link">
                                            <a href="injectables/SmartContractsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SmartContractsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-b29d60e51dd2fb703bfcf680a7b66b1dfc8ca4530f0a9a23ce88fb312fd4653ea105664d97e293cb7b3778a944a7377bb454edd330b3982983beefb186a3ab5a"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-b29d60e51dd2fb703bfcf680a7b66b1dfc8ca4530f0a9a23ce88fb312fd4653ea105664d97e293cb7b3778a944a7377bb454edd330b3982983beefb186a3ab5a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-b29d60e51dd2fb703bfcf680a7b66b1dfc8ca4530f0a9a23ce88fb312fd4653ea105664d97e293cb7b3778a944a7377bb454edd330b3982983beefb186a3ab5a"' :
                                            'id="xs-controllers-links-module-UsersModule-b29d60e51dd2fb703bfcf680a7b66b1dfc8ca4530f0a9a23ce88fb312fd4653ea105664d97e293cb7b3778a944a7377bb454edd330b3982983beefb186a3ab5a"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-b29d60e51dd2fb703bfcf680a7b66b1dfc8ca4530f0a9a23ce88fb312fd4653ea105664d97e293cb7b3778a944a7377bb454edd330b3982983beefb186a3ab5a"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-b29d60e51dd2fb703bfcf680a7b66b1dfc8ca4530f0a9a23ce88fb312fd4653ea105664d97e293cb7b3778a944a7377bb454edd330b3982983beefb186a3ab5a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-b29d60e51dd2fb703bfcf680a7b66b1dfc8ca4530f0a9a23ce88fb312fd4653ea105664d97e293cb7b3778a944a7377bb454edd330b3982983beefb186a3ab5a"' :
                                        'id="xs-injectables-links-module-UsersModule-b29d60e51dd2fb703bfcf680a7b66b1dfc8ca4530f0a9a23ce88fb312fd4653ea105664d97e293cb7b3778a944a7377bb454edd330b3982983beefb186a3ab5a"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ContractAttributesController.html" data-type="entity-link" >ContractAttributesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ContractAttributeValuesController.html" data-type="entity-link" >ContractAttributeValuesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ContractPartyInfosController.html" data-type="entity-link" >ContractPartyInfosController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ContractsController.html" data-type="entity-link" >ContractsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/InvitationsController.html" data-type="entity-link" >InvitationsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PartiesController.html" data-type="entity-link" >PartiesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PartyInfosController.html" data-type="entity-link" >PartyInfosController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SmartContractsController.html" data-type="entity-link" >SmartContractsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateContractAttributeDto.html" data-type="entity-link" >CreateContractAttributeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateContractAttributeValueDto.html" data-type="entity-link" >CreateContractAttributeValueDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateContractDto.html" data-type="entity-link" >CreateContractDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateContractPartyInfoDto.html" data-type="entity-link" >CreateContractPartyInfoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateInvitationDto.html" data-type="entity-link" >CreateInvitationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePartyDto.html" data-type="entity-link" >CreatePartyDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePartyInfoDto.html" data-type="entity-link" >CreatePartyInfoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSmartContractDto.html" data-type="entity-link" >CreateSmartContractDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GasPriceDto.html" data-type="entity-link" >GasPriceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/QueueProcessorSendInvitation.html" data-type="entity-link" >QueueProcessorSendInvitation</a>
                            </li>
                            <li class="link">
                                <a href="classes/QueueProcessorService.html" data-type="entity-link" >QueueProcessorService</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateContractAttributeDto.html" data-type="entity-link" >UpdateContractAttributeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateContractAttributeValueDto.html" data-type="entity-link" >UpdateContractAttributeValueDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateContractDto.html" data-type="entity-link" >UpdateContractDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateContractPartyInfoDto.html" data-type="entity-link" >UpdateContractPartyInfoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateInvitationDto.html" data-type="entity-link" >UpdateInvitationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePartyDto.html" data-type="entity-link" >UpdatePartyDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePartyInfoDto.html" data-type="entity-link" >UpdatePartyInfoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSmartContractDto.html" data-type="entity-link" >UpdateSmartContractDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserPINDto.html" data-type="entity-link" >UpdateUserPINDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CommonService.html" data-type="entity-link" >CommonService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ContractAttributesService.html" data-type="entity-link" >ContractAttributesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ContractAttributeValuesService.html" data-type="entity-link" >ContractAttributeValuesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ContractPartyInfosService.html" data-type="entity-link" >ContractPartyInfosService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ContractsService.html" data-type="entity-link" >ContractsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InvitationsService.html" data-type="entity-link" >InvitationsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link" >LocalAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStrategy.html" data-type="entity-link" >LocalStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MailService.html" data-type="entity-link" >MailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PartiesService.html" data-type="entity-link" >PartiesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PartyInfosService.html" data-type="entity-link" >PartyInfosService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/QueueRedisService.html" data-type="entity-link" >QueueRedisService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SmartContractsService.html" data-type="entity-link" >SmartContractsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IContractAttributeValue.html" data-type="entity-link" >IContractAttributeValue</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IContractJSON.html" data-type="entity-link" >IContractJSON</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IExecutor.html" data-type="entity-link" >IExecutor</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IGasPrice.html" data-type="entity-link" >IGasPrice</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IQueuePayloadDeployContract.html" data-type="entity-link" >IQueuePayloadDeployContract</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IQueuePayloadSendInvitation.html" data-type="entity-link" >IQueuePayloadSendInvitation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUser.html" data-type="entity-link" >IUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MailPayload.html" data-type="entity-link" >MailPayload</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});