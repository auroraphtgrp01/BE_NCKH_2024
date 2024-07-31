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
                                            'data-bs-target="#controllers-links-module-AppModule-37f917a6572193acb9abb650f796206735d6e70b65749a92b0515a3f72a911e209b9bf94fc08ebfb6f8ce37983fbb17aff0348b5f700031a7a402d3e8ab2b2f9"' : 'data-bs-target="#xs-controllers-links-module-AppModule-37f917a6572193acb9abb650f796206735d6e70b65749a92b0515a3f72a911e209b9bf94fc08ebfb6f8ce37983fbb17aff0348b5f700031a7a402d3e8ab2b2f9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-37f917a6572193acb9abb650f796206735d6e70b65749a92b0515a3f72a911e209b9bf94fc08ebfb6f8ce37983fbb17aff0348b5f700031a7a402d3e8ab2b2f9"' :
                                            'id="xs-controllers-links-module-AppModule-37f917a6572193acb9abb650f796206735d6e70b65749a92b0515a3f72a911e209b9bf94fc08ebfb6f8ce37983fbb17aff0348b5f700031a7a402d3e8ab2b2f9"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-37f917a6572193acb9abb650f796206735d6e70b65749a92b0515a3f72a911e209b9bf94fc08ebfb6f8ce37983fbb17aff0348b5f700031a7a402d3e8ab2b2f9"' : 'data-bs-target="#xs-injectables-links-module-AppModule-37f917a6572193acb9abb650f796206735d6e70b65749a92b0515a3f72a911e209b9bf94fc08ebfb6f8ce37983fbb17aff0348b5f700031a7a402d3e8ab2b2f9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-37f917a6572193acb9abb650f796206735d6e70b65749a92b0515a3f72a911e209b9bf94fc08ebfb6f8ce37983fbb17aff0348b5f700031a7a402d3e8ab2b2f9"' :
                                        'id="xs-injectables-links-module-AppModule-37f917a6572193acb9abb650f796206735d6e70b65749a92b0515a3f72a911e209b9bf94fc08ebfb6f8ce37983fbb17aff0348b5f700031a7a402d3e8ab2b2f9"' }>
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
                                <a href="modules/CommonModule.html" data-type="entity-link" >CommonModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CommonModule-f96de056e09b21ac31c6c943e298ffbc3ded734291adcfda8155eb5160ea321fc9fbd6201b07dbb80b1880a362a84ee2f9351af7508633fc717fb16f504c9c37"' : 'data-bs-target="#xs-injectables-links-module-CommonModule-f96de056e09b21ac31c6c943e298ffbc3ded734291adcfda8155eb5160ea321fc9fbd6201b07dbb80b1880a362a84ee2f9351af7508633fc717fb16f504c9c37"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CommonModule-f96de056e09b21ac31c6c943e298ffbc3ded734291adcfda8155eb5160ea321fc9fbd6201b07dbb80b1880a362a84ee2f9351af7508633fc717fb16f504c9c37"' :
                                        'id="xs-injectables-links-module-CommonModule-f96de056e09b21ac31c6c943e298ffbc3ded734291adcfda8155eb5160ea321fc9fbd6201b07dbb80b1880a362a84ee2f9351af7508633fc717fb16f504c9c37"' }>
                                        <li class="link">
                                            <a href="injectables/CommonService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CommonService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ContractAttributesModule.html" data-type="entity-link" >ContractAttributesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ContractAttributesModule-55ce7a9927eabc6f2234f7f133c8b997c729f5941b917a99ee469896ef2bd96013e9bfb320f34f7834543b27dafadebac48c5ad77c774b67e5ddf41d4bc50aae"' : 'data-bs-target="#xs-controllers-links-module-ContractAttributesModule-55ce7a9927eabc6f2234f7f133c8b997c729f5941b917a99ee469896ef2bd96013e9bfb320f34f7834543b27dafadebac48c5ad77c774b67e5ddf41d4bc50aae"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ContractAttributesModule-55ce7a9927eabc6f2234f7f133c8b997c729f5941b917a99ee469896ef2bd96013e9bfb320f34f7834543b27dafadebac48c5ad77c774b67e5ddf41d4bc50aae"' :
                                            'id="xs-controllers-links-module-ContractAttributesModule-55ce7a9927eabc6f2234f7f133c8b997c729f5941b917a99ee469896ef2bd96013e9bfb320f34f7834543b27dafadebac48c5ad77c774b67e5ddf41d4bc50aae"' }>
                                            <li class="link">
                                                <a href="controllers/ContractAttributesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ContractAttributesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ContractAttributesModule-55ce7a9927eabc6f2234f7f133c8b997c729f5941b917a99ee469896ef2bd96013e9bfb320f34f7834543b27dafadebac48c5ad77c774b67e5ddf41d4bc50aae"' : 'data-bs-target="#xs-injectables-links-module-ContractAttributesModule-55ce7a9927eabc6f2234f7f133c8b997c729f5941b917a99ee469896ef2bd96013e9bfb320f34f7834543b27dafadebac48c5ad77c774b67e5ddf41d4bc50aae"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ContractAttributesModule-55ce7a9927eabc6f2234f7f133c8b997c729f5941b917a99ee469896ef2bd96013e9bfb320f34f7834543b27dafadebac48c5ad77c774b67e5ddf41d4bc50aae"' :
                                        'id="xs-injectables-links-module-ContractAttributesModule-55ce7a9927eabc6f2234f7f133c8b997c729f5941b917a99ee469896ef2bd96013e9bfb320f34f7834543b27dafadebac48c5ad77c774b67e5ddf41d4bc50aae"' }>
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
                                            'data-bs-target="#controllers-links-module-ContractAttributeValuesModule-38140076170c63323f5de96e9d919bcc87b6b650e6bd1b8be8fb0dd1e0ad56e11dbc981d7af508939ad3942de866ffdf0fa4d9e41bdad4975e0f42238fbcaa9c"' : 'data-bs-target="#xs-controllers-links-module-ContractAttributeValuesModule-38140076170c63323f5de96e9d919bcc87b6b650e6bd1b8be8fb0dd1e0ad56e11dbc981d7af508939ad3942de866ffdf0fa4d9e41bdad4975e0f42238fbcaa9c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ContractAttributeValuesModule-38140076170c63323f5de96e9d919bcc87b6b650e6bd1b8be8fb0dd1e0ad56e11dbc981d7af508939ad3942de866ffdf0fa4d9e41bdad4975e0f42238fbcaa9c"' :
                                            'id="xs-controllers-links-module-ContractAttributeValuesModule-38140076170c63323f5de96e9d919bcc87b6b650e6bd1b8be8fb0dd1e0ad56e11dbc981d7af508939ad3942de866ffdf0fa4d9e41bdad4975e0f42238fbcaa9c"' }>
                                            <li class="link">
                                                <a href="controllers/ContractAttributeValuesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ContractAttributeValuesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ContractAttributeValuesModule-38140076170c63323f5de96e9d919bcc87b6b650e6bd1b8be8fb0dd1e0ad56e11dbc981d7af508939ad3942de866ffdf0fa4d9e41bdad4975e0f42238fbcaa9c"' : 'data-bs-target="#xs-injectables-links-module-ContractAttributeValuesModule-38140076170c63323f5de96e9d919bcc87b6b650e6bd1b8be8fb0dd1e0ad56e11dbc981d7af508939ad3942de866ffdf0fa4d9e41bdad4975e0f42238fbcaa9c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ContractAttributeValuesModule-38140076170c63323f5de96e9d919bcc87b6b650e6bd1b8be8fb0dd1e0ad56e11dbc981d7af508939ad3942de866ffdf0fa4d9e41bdad4975e0f42238fbcaa9c"' :
                                        'id="xs-injectables-links-module-ContractAttributeValuesModule-38140076170c63323f5de96e9d919bcc87b6b650e6bd1b8be8fb0dd1e0ad56e11dbc981d7af508939ad3942de866ffdf0fa4d9e41bdad4975e0f42238fbcaa9c"' }>
                                        <li class="link">
                                            <a href="injectables/ContractAttributeValuesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ContractAttributeValuesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ContractsModule.html" data-type="entity-link" >ContractsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ContractsModule-5f8600eea3c94991cb4a2b78809de6e8ee8551a68d0fa8cb4056840020eae79ed07f542628c26863e9f113928d8697daddfa66f9e7fe4f18ccf9c7d9258366d9"' : 'data-bs-target="#xs-controllers-links-module-ContractsModule-5f8600eea3c94991cb4a2b78809de6e8ee8551a68d0fa8cb4056840020eae79ed07f542628c26863e9f113928d8697daddfa66f9e7fe4f18ccf9c7d9258366d9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ContractsModule-5f8600eea3c94991cb4a2b78809de6e8ee8551a68d0fa8cb4056840020eae79ed07f542628c26863e9f113928d8697daddfa66f9e7fe4f18ccf9c7d9258366d9"' :
                                            'id="xs-controllers-links-module-ContractsModule-5f8600eea3c94991cb4a2b78809de6e8ee8551a68d0fa8cb4056840020eae79ed07f542628c26863e9f113928d8697daddfa66f9e7fe4f18ccf9c7d9258366d9"' }>
                                            <li class="link">
                                                <a href="controllers/ContractsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ContractsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ContractsModule-5f8600eea3c94991cb4a2b78809de6e8ee8551a68d0fa8cb4056840020eae79ed07f542628c26863e9f113928d8697daddfa66f9e7fe4f18ccf9c7d9258366d9"' : 'data-bs-target="#xs-injectables-links-module-ContractsModule-5f8600eea3c94991cb4a2b78809de6e8ee8551a68d0fa8cb4056840020eae79ed07f542628c26863e9f113928d8697daddfa66f9e7fe4f18ccf9c7d9258366d9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ContractsModule-5f8600eea3c94991cb4a2b78809de6e8ee8551a68d0fa8cb4056840020eae79ed07f542628c26863e9f113928d8697daddfa66f9e7fe4f18ccf9c7d9258366d9"' :
                                        'id="xs-injectables-links-module-ContractsModule-5f8600eea3c94991cb4a2b78809de6e8ee8551a68d0fa8cb4056840020eae79ed07f542628c26863e9f113928d8697daddfa66f9e7fe4f18ccf9c7d9258366d9"' }>
                                        <li class="link">
                                            <a href="injectables/ContractsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ContractsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ImagesModule.html" data-type="entity-link" >ImagesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ImagesModule-bca0e177ad21dd96c8817cee777eceee31396e71339680caf0270abb3933928a6db6e03f370b98f384985367d020532dbe87769f043cb270bbc7cd0d46e859bc"' : 'data-bs-target="#xs-controllers-links-module-ImagesModule-bca0e177ad21dd96c8817cee777eceee31396e71339680caf0270abb3933928a6db6e03f370b98f384985367d020532dbe87769f043cb270bbc7cd0d46e859bc"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ImagesModule-bca0e177ad21dd96c8817cee777eceee31396e71339680caf0270abb3933928a6db6e03f370b98f384985367d020532dbe87769f043cb270bbc7cd0d46e859bc"' :
                                            'id="xs-controllers-links-module-ImagesModule-bca0e177ad21dd96c8817cee777eceee31396e71339680caf0270abb3933928a6db6e03f370b98f384985367d020532dbe87769f043cb270bbc7cd0d46e859bc"' }>
                                            <li class="link">
                                                <a href="controllers/ImagesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ImagesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ImagesModule-bca0e177ad21dd96c8817cee777eceee31396e71339680caf0270abb3933928a6db6e03f370b98f384985367d020532dbe87769f043cb270bbc7cd0d46e859bc"' : 'data-bs-target="#xs-injectables-links-module-ImagesModule-bca0e177ad21dd96c8817cee777eceee31396e71339680caf0270abb3933928a6db6e03f370b98f384985367d020532dbe87769f043cb270bbc7cd0d46e859bc"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ImagesModule-bca0e177ad21dd96c8817cee777eceee31396e71339680caf0270abb3933928a6db6e03f370b98f384985367d020532dbe87769f043cb270bbc7cd0d46e859bc"' :
                                        'id="xs-injectables-links-module-ImagesModule-bca0e177ad21dd96c8817cee777eceee31396e71339680caf0270abb3933928a6db6e03f370b98f384985367d020532dbe87769f043cb270bbc7cd0d46e859bc"' }>
                                        <li class="link">
                                            <a href="injectables/ImagesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ImagesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MailModule.html" data-type="entity-link" >MailModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MailModule-902361b2a0e1254c081bdd1293d52573ec9e943764252aab94e661418567e006dc2a63f7866a2d6690fd8adac4ff9bf38d3806e4dfffa896d43f97d53be41950"' : 'data-bs-target="#xs-injectables-links-module-MailModule-902361b2a0e1254c081bdd1293d52573ec9e943764252aab94e661418567e006dc2a63f7866a2d6690fd8adac4ff9bf38d3806e4dfffa896d43f97d53be41950"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MailModule-902361b2a0e1254c081bdd1293d52573ec9e943764252aab94e661418567e006dc2a63f7866a2d6690fd8adac4ff9bf38d3806e4dfffa896d43f97d53be41950"' :
                                        'id="xs-injectables-links-module-MailModule-902361b2a0e1254c081bdd1293d52573ec9e943764252aab94e661418567e006dc2a63f7866a2d6690fd8adac4ff9bf38d3806e4dfffa896d43f97d53be41950"' }>
                                        <li class="link">
                                            <a href="injectables/MailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OrdersModule.html" data-type="entity-link" >OrdersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-OrdersModule-b6f2f5277c89615fb3bb40c192e5277dcefd37afdb3f0fa21e65fbeff389a99fed3de656b3f1420d4828a061e2c51961e6041c19af60e20d4519b261bbc0b3f7"' : 'data-bs-target="#xs-controllers-links-module-OrdersModule-b6f2f5277c89615fb3bb40c192e5277dcefd37afdb3f0fa21e65fbeff389a99fed3de656b3f1420d4828a061e2c51961e6041c19af60e20d4519b261bbc0b3f7"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-OrdersModule-b6f2f5277c89615fb3bb40c192e5277dcefd37afdb3f0fa21e65fbeff389a99fed3de656b3f1420d4828a061e2c51961e6041c19af60e20d4519b261bbc0b3f7"' :
                                            'id="xs-controllers-links-module-OrdersModule-b6f2f5277c89615fb3bb40c192e5277dcefd37afdb3f0fa21e65fbeff389a99fed3de656b3f1420d4828a061e2c51961e6041c19af60e20d4519b261bbc0b3f7"' }>
                                            <li class="link">
                                                <a href="controllers/OrdersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrdersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-OrdersModule-b6f2f5277c89615fb3bb40c192e5277dcefd37afdb3f0fa21e65fbeff389a99fed3de656b3f1420d4828a061e2c51961e6041c19af60e20d4519b261bbc0b3f7"' : 'data-bs-target="#xs-injectables-links-module-OrdersModule-b6f2f5277c89615fb3bb40c192e5277dcefd37afdb3f0fa21e65fbeff389a99fed3de656b3f1420d4828a061e2c51961e6041c19af60e20d4519b261bbc0b3f7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-OrdersModule-b6f2f5277c89615fb3bb40c192e5277dcefd37afdb3f0fa21e65fbeff389a99fed3de656b3f1420d4828a061e2c51961e6041c19af60e20d4519b261bbc0b3f7"' :
                                        'id="xs-injectables-links-module-OrdersModule-b6f2f5277c89615fb3bb40c192e5277dcefd37afdb3f0fa21e65fbeff389a99fed3de656b3f1420d4828a061e2c51961e6041c19af60e20d4519b261bbc0b3f7"' }>
                                        <li class="link">
                                            <a href="injectables/OrdersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrdersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ParticipantsModule.html" data-type="entity-link" >ParticipantsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ParticipantsModule-0bd38bac10e785c3e2c28657c3e8de7a06415a1ddca3af2203ee858e5bf3f3d774e65b75507f77e0f917872bdccd5b737ed0e8f203b141f5c34a338dddb6f06e"' : 'data-bs-target="#xs-controllers-links-module-ParticipantsModule-0bd38bac10e785c3e2c28657c3e8de7a06415a1ddca3af2203ee858e5bf3f3d774e65b75507f77e0f917872bdccd5b737ed0e8f203b141f5c34a338dddb6f06e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ParticipantsModule-0bd38bac10e785c3e2c28657c3e8de7a06415a1ddca3af2203ee858e5bf3f3d774e65b75507f77e0f917872bdccd5b737ed0e8f203b141f5c34a338dddb6f06e"' :
                                            'id="xs-controllers-links-module-ParticipantsModule-0bd38bac10e785c3e2c28657c3e8de7a06415a1ddca3af2203ee858e5bf3f3d774e65b75507f77e0f917872bdccd5b737ed0e8f203b141f5c34a338dddb6f06e"' }>
                                            <li class="link">
                                                <a href="controllers/ParticipantsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ParticipantsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ParticipantsModule-0bd38bac10e785c3e2c28657c3e8de7a06415a1ddca3af2203ee858e5bf3f3d774e65b75507f77e0f917872bdccd5b737ed0e8f203b141f5c34a338dddb6f06e"' : 'data-bs-target="#xs-injectables-links-module-ParticipantsModule-0bd38bac10e785c3e2c28657c3e8de7a06415a1ddca3af2203ee858e5bf3f3d774e65b75507f77e0f917872bdccd5b737ed0e8f203b141f5c34a338dddb6f06e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ParticipantsModule-0bd38bac10e785c3e2c28657c3e8de7a06415a1ddca3af2203ee858e5bf3f3d774e65b75507f77e0f917872bdccd5b737ed0e8f203b141f5c34a338dddb6f06e"' :
                                        'id="xs-injectables-links-module-ParticipantsModule-0bd38bac10e785c3e2c28657c3e8de7a06415a1ddca3af2203ee858e5bf3f3d774e65b75507f77e0f917872bdccd5b737ed0e8f203b141f5c34a338dddb6f06e"' }>
                                        <li class="link">
                                            <a href="injectables/ParticipantsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ParticipantsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductsModule.html" data-type="entity-link" >ProductsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ProductsModule-1a55571beeb86acec7eb4ab0ed8b8f90913400124664af040208488c93d2b455d7958042f21e8783b6aefe9270055f93185d1dfcfde4e66e3ed3f0692c6410f5"' : 'data-bs-target="#xs-controllers-links-module-ProductsModule-1a55571beeb86acec7eb4ab0ed8b8f90913400124664af040208488c93d2b455d7958042f21e8783b6aefe9270055f93185d1dfcfde4e66e3ed3f0692c6410f5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductsModule-1a55571beeb86acec7eb4ab0ed8b8f90913400124664af040208488c93d2b455d7958042f21e8783b6aefe9270055f93185d1dfcfde4e66e3ed3f0692c6410f5"' :
                                            'id="xs-controllers-links-module-ProductsModule-1a55571beeb86acec7eb4ab0ed8b8f90913400124664af040208488c93d2b455d7958042f21e8783b6aefe9270055f93185d1dfcfde4e66e3ed3f0692c6410f5"' }>
                                            <li class="link">
                                                <a href="controllers/ProductsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ProductsModule-1a55571beeb86acec7eb4ab0ed8b8f90913400124664af040208488c93d2b455d7958042f21e8783b6aefe9270055f93185d1dfcfde4e66e3ed3f0692c6410f5"' : 'data-bs-target="#xs-injectables-links-module-ProductsModule-1a55571beeb86acec7eb4ab0ed8b8f90913400124664af040208488c93d2b455d7958042f21e8783b6aefe9270055f93185d1dfcfde4e66e3ed3f0692c6410f5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductsModule-1a55571beeb86acec7eb4ab0ed8b8f90913400124664af040208488c93d2b455d7958042f21e8783b6aefe9270055f93185d1dfcfde4e66e3ed3f0692c6410f5"' :
                                        'id="xs-injectables-links-module-ProductsModule-1a55571beeb86acec7eb4ab0ed8b8f90913400124664af040208488c93d2b455d7958042f21e8783b6aefe9270055f93185d1dfcfde4e66e3ed3f0692c6410f5"' }>
                                        <li class="link">
                                            <a href="injectables/ProductsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/QueueRedisModule.html" data-type="entity-link" >QueueRedisModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-QueueRedisModule-24982dbcff7dc03cef48e6138fd3f3f909a5bb951b4739720b85f84047c525d63faa094c0db3365d7cda4791aaf5496f71fcee9a26681f135f9e9a8cd371ee73"' : 'data-bs-target="#xs-injectables-links-module-QueueRedisModule-24982dbcff7dc03cef48e6138fd3f3f909a5bb951b4739720b85f84047c525d63faa094c0db3365d7cda4791aaf5496f71fcee9a26681f135f9e9a8cd371ee73"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-QueueRedisModule-24982dbcff7dc03cef48e6138fd3f3f909a5bb951b4739720b85f84047c525d63faa094c0db3365d7cda4791aaf5496f71fcee9a26681f135f9e9a8cd371ee73"' :
                                        'id="xs-injectables-links-module-QueueRedisModule-24982dbcff7dc03cef48e6138fd3f3f909a5bb951b4739720b85f84047c525d63faa094c0db3365d7cda4791aaf5496f71fcee9a26681f135f9e9a8cd371ee73"' }>
                                        <li class="link">
                                            <a href="injectables/QueueRedisService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >QueueRedisService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RolesModule.html" data-type="entity-link" >RolesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-RolesModule-651daa8873a1aa2c2d2f1a490d4d856d0243709a6b920e2c97686e3c2212cce4dcb554f250e8b73814fed68153fbc6717d1c042b4ccff365a1b7c6af9e681f6f"' : 'data-bs-target="#xs-controllers-links-module-RolesModule-651daa8873a1aa2c2d2f1a490d4d856d0243709a6b920e2c97686e3c2212cce4dcb554f250e8b73814fed68153fbc6717d1c042b4ccff365a1b7c6af9e681f6f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RolesModule-651daa8873a1aa2c2d2f1a490d4d856d0243709a6b920e2c97686e3c2212cce4dcb554f250e8b73814fed68153fbc6717d1c042b4ccff365a1b7c6af9e681f6f"' :
                                            'id="xs-controllers-links-module-RolesModule-651daa8873a1aa2c2d2f1a490d4d856d0243709a6b920e2c97686e3c2212cce4dcb554f250e8b73814fed68153fbc6717d1c042b4ccff365a1b7c6af9e681f6f"' }>
                                            <li class="link">
                                                <a href="controllers/RolesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RolesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RolesModule-651daa8873a1aa2c2d2f1a490d4d856d0243709a6b920e2c97686e3c2212cce4dcb554f250e8b73814fed68153fbc6717d1c042b4ccff365a1b7c6af9e681f6f"' : 'data-bs-target="#xs-injectables-links-module-RolesModule-651daa8873a1aa2c2d2f1a490d4d856d0243709a6b920e2c97686e3c2212cce4dcb554f250e8b73814fed68153fbc6717d1c042b4ccff365a1b7c6af9e681f6f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RolesModule-651daa8873a1aa2c2d2f1a490d4d856d0243709a6b920e2c97686e3c2212cce4dcb554f250e8b73814fed68153fbc6717d1c042b4ccff365a1b7c6af9e681f6f"' :
                                        'id="xs-injectables-links-module-RolesModule-651daa8873a1aa2c2d2f1a490d4d856d0243709a6b920e2c97686e3c2212cce4dcb554f250e8b73814fed68153fbc6717d1c042b4ccff365a1b7c6af9e681f6f"' }>
                                        <li class="link">
                                            <a href="injectables/RolesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RolesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SmartContractsModule.html" data-type="entity-link" >SmartContractsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-SmartContractsModule-ae789525e09b4ef93a501d5c507dc17d8f009f2682b3a46a103b76a02787e841dd5c0a041d6672d9746e7fb97c8ca45d212f1b9a55e139481b8ace041dc0172b"' : 'data-bs-target="#xs-controllers-links-module-SmartContractsModule-ae789525e09b4ef93a501d5c507dc17d8f009f2682b3a46a103b76a02787e841dd5c0a041d6672d9746e7fb97c8ca45d212f1b9a55e139481b8ace041dc0172b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SmartContractsModule-ae789525e09b4ef93a501d5c507dc17d8f009f2682b3a46a103b76a02787e841dd5c0a041d6672d9746e7fb97c8ca45d212f1b9a55e139481b8ace041dc0172b"' :
                                            'id="xs-controllers-links-module-SmartContractsModule-ae789525e09b4ef93a501d5c507dc17d8f009f2682b3a46a103b76a02787e841dd5c0a041d6672d9746e7fb97c8ca45d212f1b9a55e139481b8ace041dc0172b"' }>
                                            <li class="link">
                                                <a href="controllers/SmartContractsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SmartContractsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SmartContractsModule-ae789525e09b4ef93a501d5c507dc17d8f009f2682b3a46a103b76a02787e841dd5c0a041d6672d9746e7fb97c8ca45d212f1b9a55e139481b8ace041dc0172b"' : 'data-bs-target="#xs-injectables-links-module-SmartContractsModule-ae789525e09b4ef93a501d5c507dc17d8f009f2682b3a46a103b76a02787e841dd5c0a041d6672d9746e7fb97c8ca45d212f1b9a55e139481b8ace041dc0172b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SmartContractsModule-ae789525e09b4ef93a501d5c507dc17d8f009f2682b3a46a103b76a02787e841dd5c0a041d6672d9746e7fb97c8ca45d212f1b9a55e139481b8ace041dc0172b"' :
                                        'id="xs-injectables-links-module-SmartContractsModule-ae789525e09b4ef93a501d5c507dc17d8f009f2682b3a46a103b76a02787e841dd5c0a041d6672d9746e7fb97c8ca45d212f1b9a55e139481b8ace041dc0172b"' }>
                                        <li class="link">
                                            <a href="injectables/SmartContractsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SmartContractsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SuppliersModule.html" data-type="entity-link" >SuppliersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-SuppliersModule-cbc3cae4230638ce3cf18d8ca8b2ff4c859f4ee48bb5945ce0b1d97b9f873c0bb70debaaa6c9ee6869bb54f6369eaf9dbd91f20ef238c27128e26b1ae556443d"' : 'data-bs-target="#xs-controllers-links-module-SuppliersModule-cbc3cae4230638ce3cf18d8ca8b2ff4c859f4ee48bb5945ce0b1d97b9f873c0bb70debaaa6c9ee6869bb54f6369eaf9dbd91f20ef238c27128e26b1ae556443d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SuppliersModule-cbc3cae4230638ce3cf18d8ca8b2ff4c859f4ee48bb5945ce0b1d97b9f873c0bb70debaaa6c9ee6869bb54f6369eaf9dbd91f20ef238c27128e26b1ae556443d"' :
                                            'id="xs-controllers-links-module-SuppliersModule-cbc3cae4230638ce3cf18d8ca8b2ff4c859f4ee48bb5945ce0b1d97b9f873c0bb70debaaa6c9ee6869bb54f6369eaf9dbd91f20ef238c27128e26b1ae556443d"' }>
                                            <li class="link">
                                                <a href="controllers/SuppliersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SuppliersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SuppliersModule-cbc3cae4230638ce3cf18d8ca8b2ff4c859f4ee48bb5945ce0b1d97b9f873c0bb70debaaa6c9ee6869bb54f6369eaf9dbd91f20ef238c27128e26b1ae556443d"' : 'data-bs-target="#xs-injectables-links-module-SuppliersModule-cbc3cae4230638ce3cf18d8ca8b2ff4c859f4ee48bb5945ce0b1d97b9f873c0bb70debaaa6c9ee6869bb54f6369eaf9dbd91f20ef238c27128e26b1ae556443d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SuppliersModule-cbc3cae4230638ce3cf18d8ca8b2ff4c859f4ee48bb5945ce0b1d97b9f873c0bb70debaaa6c9ee6869bb54f6369eaf9dbd91f20ef238c27128e26b1ae556443d"' :
                                        'id="xs-injectables-links-module-SuppliersModule-cbc3cae4230638ce3cf18d8ca8b2ff4c859f4ee48bb5945ce0b1d97b9f873c0bb70debaaa6c9ee6869bb54f6369eaf9dbd91f20ef238c27128e26b1ae556443d"' }>
                                        <li class="link">
                                            <a href="injectables/SuppliersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SuppliersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TemplateContractsModule.html" data-type="entity-link" >TemplateContractsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TemplateContractsModule-9c964f4767f4551a97e4a562558da9d288d4e25967fcc8624c49bebd843b3a8d498869240fccc846203f8c35f7ac5e1ad14fba66744dc96ea2fe73ce66af56f3"' : 'data-bs-target="#xs-controllers-links-module-TemplateContractsModule-9c964f4767f4551a97e4a562558da9d288d4e25967fcc8624c49bebd843b3a8d498869240fccc846203f8c35f7ac5e1ad14fba66744dc96ea2fe73ce66af56f3"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TemplateContractsModule-9c964f4767f4551a97e4a562558da9d288d4e25967fcc8624c49bebd843b3a8d498869240fccc846203f8c35f7ac5e1ad14fba66744dc96ea2fe73ce66af56f3"' :
                                            'id="xs-controllers-links-module-TemplateContractsModule-9c964f4767f4551a97e4a562558da9d288d4e25967fcc8624c49bebd843b3a8d498869240fccc846203f8c35f7ac5e1ad14fba66744dc96ea2fe73ce66af56f3"' }>
                                            <li class="link">
                                                <a href="controllers/TemplateContractsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TemplateContractsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TemplateContractsModule-9c964f4767f4551a97e4a562558da9d288d4e25967fcc8624c49bebd843b3a8d498869240fccc846203f8c35f7ac5e1ad14fba66744dc96ea2fe73ce66af56f3"' : 'data-bs-target="#xs-injectables-links-module-TemplateContractsModule-9c964f4767f4551a97e4a562558da9d288d4e25967fcc8624c49bebd843b3a8d498869240fccc846203f8c35f7ac5e1ad14fba66744dc96ea2fe73ce66af56f3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TemplateContractsModule-9c964f4767f4551a97e4a562558da9d288d4e25967fcc8624c49bebd843b3a8d498869240fccc846203f8c35f7ac5e1ad14fba66744dc96ea2fe73ce66af56f3"' :
                                        'id="xs-injectables-links-module-TemplateContractsModule-9c964f4767f4551a97e4a562558da9d288d4e25967fcc8624c49bebd843b3a8d498869240fccc846203f8c35f7ac5e1ad14fba66744dc96ea2fe73ce66af56f3"' }>
                                        <li class="link">
                                            <a href="injectables/TemplateContractsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TemplateContractsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-fed07936338a35ce7170a21a2338205ceb97425b8f588ac040eb25586b302dfb38396eb691bb03c0f1c69554f451b7f14be0b95caa120d551acb86495c516f42"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-fed07936338a35ce7170a21a2338205ceb97425b8f588ac040eb25586b302dfb38396eb691bb03c0f1c69554f451b7f14be0b95caa120d551acb86495c516f42"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-fed07936338a35ce7170a21a2338205ceb97425b8f588ac040eb25586b302dfb38396eb691bb03c0f1c69554f451b7f14be0b95caa120d551acb86495c516f42"' :
                                            'id="xs-controllers-links-module-UsersModule-fed07936338a35ce7170a21a2338205ceb97425b8f588ac040eb25586b302dfb38396eb691bb03c0f1c69554f451b7f14be0b95caa120d551acb86495c516f42"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-fed07936338a35ce7170a21a2338205ceb97425b8f588ac040eb25586b302dfb38396eb691bb03c0f1c69554f451b7f14be0b95caa120d551acb86495c516f42"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-fed07936338a35ce7170a21a2338205ceb97425b8f588ac040eb25586b302dfb38396eb691bb03c0f1c69554f451b7f14be0b95caa120d551acb86495c516f42"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-fed07936338a35ce7170a21a2338205ceb97425b8f588ac040eb25586b302dfb38396eb691bb03c0f1c69554f451b7f14be0b95caa120d551acb86495c516f42"' :
                                        'id="xs-injectables-links-module-UsersModule-fed07936338a35ce7170a21a2338205ceb97425b8f588ac040eb25586b302dfb38396eb691bb03c0f1c69554f451b7f14be0b95caa120d551acb86495c516f42"' }>
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
                                    <a href="controllers/ContractsController.html" data-type="entity-link" >ContractsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ImagesController.html" data-type="entity-link" >ImagesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/OrdersController.html" data-type="entity-link" >OrdersController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ParticipantsController.html" data-type="entity-link" >ParticipantsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ProductsController.html" data-type="entity-link" >ProductsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/RolesController.html" data-type="entity-link" >RolesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SmartContractsController.html" data-type="entity-link" >SmartContractsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SuppliersController.html" data-type="entity-link" >SuppliersController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/TemplateContractsController.html" data-type="entity-link" >TemplateContractsController</a>
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
                                <a href="classes/ContractAttributesDto.html" data-type="entity-link" >ContractAttributesDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateContractAttributeDto.html" data-type="entity-link" >CreateContractAttributeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateContractAttributeDto-1.html" data-type="entity-link" >CreateContractAttributeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateContractAttributeDto-2.html" data-type="entity-link" >CreateContractAttributeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateContractAttributesDto.html" data-type="entity-link" >CreateContractAttributesDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateContractAttributesDto-1.html" data-type="entity-link" >CreateContractAttributesDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateContractAttributeValueDto.html" data-type="entity-link" >CreateContractAttributeValueDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateContractDto.html" data-type="entity-link" >CreateContractDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateDisputeContractDto.html" data-type="entity-link" >CreateDisputeContractDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateEmptyContractDto.html" data-type="entity-link" >CreateEmptyContractDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateImageDto.html" data-type="entity-link" >CreateImageDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateOrderDto.html" data-type="entity-link" >CreateOrderDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateParticipantDto.html" data-type="entity-link" >CreateParticipantDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProductDto.html" data-type="entity-link" >CreateProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRoleDto.html" data-type="entity-link" >CreateRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSmartContractDto.html" data-type="entity-link" >CreateSmartContractDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSupplierDto.html" data-type="entity-link" >CreateSupplierDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTemplateContractDto.html" data-type="entity-link" >CreateTemplateContractDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DataUpdateContractAttributeDto.html" data-type="entity-link" >DataUpdateContractAttributeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GasPriceDto.html" data-type="entity-link" >GasPriceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Image.html" data-type="entity-link" >Image</a>
                            </li>
                            <li class="link">
                                <a href="classes/InvitationDto.html" data-type="entity-link" >InvitationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/InvitationsDto.html" data-type="entity-link" >InvitationsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrderProductDto.html" data-type="entity-link" >OrderProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PermissionDto.html" data-type="entity-link" >PermissionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PermissionDto-1.html" data-type="entity-link" >PermissionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Product.html" data-type="entity-link" >Product</a>
                            </li>
                            <li class="link">
                                <a href="classes/QueueProcessorSendInvitation.html" data-type="entity-link" >QueueProcessorSendInvitation</a>
                            </li>
                            <li class="link">
                                <a href="classes/QueueProcessorSendRequestSurvey.html" data-type="entity-link" >QueueProcessorSendRequestSurvey</a>
                            </li>
                            <li class="link">
                                <a href="classes/QueueProcessorService.html" data-type="entity-link" >QueueProcessorService</a>
                            </li>
                            <li class="link">
                                <a href="classes/SendInvitationsDto.html" data-type="entity-link" >SendInvitationsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/StageDto.html" data-type="entity-link" >StageDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/TemplateContractDto.html" data-type="entity-link" >TemplateContractDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateContractAttributeDto.html" data-type="entity-link" >UpdateContractAttributeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateContractAttributeDto-1.html" data-type="entity-link" >UpdateContractAttributeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateContractAttributeValueDto.html" data-type="entity-link" >UpdateContractAttributeValueDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateContractDto.html" data-type="entity-link" >UpdateContractDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateImageDto.html" data-type="entity-link" >UpdateImageDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateOrderDto.html" data-type="entity-link" >UpdateOrderDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateParticipantDto.html" data-type="entity-link" >UpdateParticipantDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProductDto.html" data-type="entity-link" >UpdateProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateRoleDto.html" data-type="entity-link" >UpdateRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSmartContractDto.html" data-type="entity-link" >UpdateSmartContractDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSupplierDto.html" data-type="entity-link" >UpdateSupplierDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTemplateContractDto.html" data-type="entity-link" >UpdateTemplateContractDto</a>
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
                                    <a href="injectables/ContractsService.html" data-type="entity-link" >ContractsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ErrorHandlingInterceptor.html" data-type="entity-link" >ErrorHandlingInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ImagesService.html" data-type="entity-link" >ImagesService</a>
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
                                    <a href="injectables/OrdersService.html" data-type="entity-link" >OrdersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ParticipantsService.html" data-type="entity-link" >ParticipantsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductsService.html" data-type="entity-link" >ProductsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/QueueRedisService.html" data-type="entity-link" >QueueRedisService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RolesService.html" data-type="entity-link" >RolesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SmartContractsService.html" data-type="entity-link" >SmartContractsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SuppliersService.html" data-type="entity-link" >SuppliersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TemplateContractsService.html" data-type="entity-link" >TemplateContractsService</a>
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
                                <a href="interfaces/DynamicType.html" data-type="entity-link" >DynamicType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IConfigService.html" data-type="entity-link" >IConfigService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IContractAttributeResponse.html" data-type="entity-link" >IContractAttributeResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IContractAttributeValueResponse.html" data-type="entity-link" >IContractAttributeValueResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IContractJSON.html" data-type="entity-link" >IContractJSON</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IContractResponse.html" data-type="entity-link" >IContractResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICreateContractAttributeRecord.html" data-type="entity-link" >ICreateContractAttributeRecord</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICreateContractAttributeValue.html" data-type="entity-link" >ICreateContractAttributeValue</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICreateContractResponse.html" data-type="entity-link" >ICreateContractResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICreateInvitation.html" data-type="entity-link" >ICreateInvitation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICreateParticipant.html" data-type="entity-link" >ICreateParticipant</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDataContractAttribute.html" data-type="entity-link" >IDataContractAttribute</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IExecutor.html" data-type="entity-link" >IExecutor</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IGasPrice.html" data-type="entity-link" >IGasPrice</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IKeyValue.html" data-type="entity-link" >IKeyValue</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IKeyValueDeploy.html" data-type="entity-link" >IKeyValueDeploy</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IOrderProduct.html" data-type="entity-link" >IOrderProduct</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPermissionContract.html" data-type="entity-link" >IPermissionContract</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IQueuePayloadDeployContract.html" data-type="entity-link" >IQueuePayloadDeployContract</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IQueuePayloadSendInvitation.html" data-type="entity-link" >IQueuePayloadSendInvitation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IQueuePayloadSendRequestSurvey.html" data-type="entity-link" >IQueuePayloadSendRequestSurvey</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IStage.html" data-type="entity-link" >IStage</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IStage-1.html" data-type="entity-link" >IStage</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IStageDeploy.html" data-type="entity-link" >IStageDeploy</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUpdateParticipant.html" data-type="entity-link" >IUpdateParticipant</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUser.html" data-type="entity-link" >IUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IValueSmartContract.html" data-type="entity-link" >IValueSmartContract</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IVoting.html" data-type="entity-link" >IVoting</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MailPayload.html" data-type="entity-link" >MailPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestSurveyPayload.html" data-type="entity-link" >RequestSurveyPayload</a>
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
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
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