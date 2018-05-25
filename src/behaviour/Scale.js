import Util from '../utils/Util';
import Behaviour from './Behaviour';

export default class Scale extends Behaviour {

	/**
	 * @memberof! Proton#
	 * @augments Proton.Behaviour
	 * @constructor
	 * @alias Proton.Scale
	 *
	 * @todo add description for 'a' and 'b'
	 *
	 * @param {Number} a
	 * @param {String} b
	 * @param {Number} [life=Infinity] 				this behaviour's life
	 * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
	 *
	 * @property {String} name The Behaviour name
	 */
	constructor(a, b, life, easing) {
		super(life, easing);

		this.reset(a, b);
		this.name = 'Scale';
	}

	/**
	 * Reset this behaviour's parameters
	 *
	 * @method reset
	 * @memberof Proton#Proton.Scale
	 * @instance
	 *
	 * @param {Number} a
	 * @param {String} b
	 * @param {Number} [life=Infinity] 				this behaviour's life
	 * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
	 */
	reset(a, b, life, easing) {
		this.same = b === null || b === undefined ? true : false;
		this.a = Util.setSpanValue(Util.initValue(a, 1));
		this.b = Util.setSpanValue(b);

		life && super.reset(life, easing);
	}

	/**
	 * Initialize the behaviour's parameters for all particles
	 *
	 * @method initialize
	 * @memberof Proton#Proton.Scale
	 * @instance
	 *
	 * @param {Proton.Particle} particle
	 */
	initialize(particle) {
		particle.transform.scaleA = this.a.getValue();
		particle.transform.oldRadius = particle.radius;
		particle.transform.scaleB = this.same ? particle.transform.scaleA : this.b.getValue();
	};

	/**
	 * Apply this behaviour for all particles every time
	 *
	 * @method applyBehaviour
	 * @memberof Proton#Proton.Scale
	 * @instance
	 *
	 * @param {Proton.Particle} particle
	 * @param {Number} 			time the integrate time 1/ms
	 * @param {Int} 			index the particle index
	 */
	applyBehaviour(particle, time, index) {
		this.calculate(particle, time, index);
		particle.scale = particle.transform.scaleB + (particle.transform.scaleA - particle.transform.scaleB) * this.energy;

		if (particle.scale < 0.0001) particle.scale = 0;
		particle.radius = particle.transform.oldRadius * particle.scale;
	}
}