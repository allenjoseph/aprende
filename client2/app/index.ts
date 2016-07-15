import {module} from 'angular';
import Authentication from './auth/authentication.run.ts';

module Aprende {

    module('aprende', [])
        .run(Authentication);

}
