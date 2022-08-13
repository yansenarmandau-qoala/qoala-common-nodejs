const expect = require('chai').expect;
const sinon = require('sinon');
const { StatsD } = require('hot-shots');

const Datadog = require('../../lib/datadog');

describe('Datadog class', function() {
    const sandbox = sinon.createSandbox();
    const stubIncrement = sandbox.stub(StatsD.prototype, 'increment');
    const stubHistogram = sandbox.stub(StatsD.prototype, 'histogram');

    const fakeConfig = {}

    const datadog = new Datadog(fakeConfig);

    describe('Stats client usage', function() {
        const metricName = 'qoala.test.metric';
        const value = 1;
        const tags = ['tag1:success', 'tag2:failed'];

        this.afterEach(sandbox.reset);

        it('should call statsd.increment when sendIncrement method is called', function() {
            datadog.sendIncrement(metricName, value, tags);
            sinon.assert.calledOnceWithExactly(stubIncrement, metricName, value, tags);
        });

        it('sould call statsd.histogram when sendHistogram method is called', function() {
            datadog.sendHistogram(metricName, value, tags);
            sinon.assert.calledOnceWithExactly(stubHistogram, metricName, value, tags);
        })
    });
});