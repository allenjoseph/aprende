import {module} from 'angular';
import Authentication from './auth/authentication.run.ts';

module('aprende', [])
    .run(Authentication);
