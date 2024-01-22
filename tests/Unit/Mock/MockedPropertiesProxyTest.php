<?php

namespace Storybook\Tests\Unit\Mock;

use PHPUnit\Framework\TestCase;
use Storybook\Mock\MockedPropertiesProxy;

class MockedPropertiesProxyTest extends TestCase
{
    public function testMockedMethodInvocation()
    {
        $component = $this->getMockBuilder(\stdClass::class)
            ->addMethods(['foo'])
            ->getMock();

        $provider = $this->getMockBuilder(\stdClass::class)
            ->addMethods(['foo'])
            ->getMock();

        $proxy = new MockedPropertiesProxy($component, $provider, ['foo' => 'foo']);

        $component->expects($this->never())->method('foo');
        $provider->expects($this->once())->method('foo')->willReturn('mocked');

        $result = $proxy->__call('foo', []);

        $this->assertEquals('mocked', $result);
    }

    public function testMockedMethodWithAnotherNameIsCalled()
    {
        $component = $this->getMockBuilder(\stdClass::class)
            ->addMethods(['foo'])
            ->getMock();

        $provider = $this->getMockBuilder(\stdClass::class)
            ->addMethods(['bar'])
            ->getMock();

        $proxy = new MockedPropertiesProxy($component, $provider, ['foo' => 'bar']);

        $component->expects($this->never())->method('foo');
        $provider->expects($this->once())->method('bar')->willReturn('mocked');

        $result = $proxy->__call('foo', []);

        $this->assertEquals('mocked', $result);
    }

    public function testNotMockedMethodIsCalledFromOriginal()
    {
        $component = $this->getMockBuilder(\stdClass::class)
            ->addMethods(['bar'])
            ->getMock();

        $provider = $this->getMockBuilder(\stdClass::class)
            ->addMethods(['bar'])
            ->getMock();

        $proxy = new MockedPropertiesProxy($component, $provider, []);

        $component->expects($this->once())->method('bar')->willReturn('bar');
        $provider->expects($this->never())->method('bar');

        $result = $proxy->__call('bar', []);

        $this->assertEquals('bar', $result);
    }

    /**
     * @dataProvider getMethods
     */
    public function testNormalizedMethodIsCalled(string $method, string $normalizedMethod)
    {
        $component = $this->getMockBuilder(\stdClass::class)
            ->addMethods([$normalizedMethod])
            ->getMock();
        $provider = $this->getMockBuilder(\stdClass::class);

        $proxy = new MockedPropertiesProxy($component, $provider, []);

        $component->expects($this->once())->method($normalizedMethod)->willReturn('foo');

        $result = $proxy->__call($method, []);

        $this->assertEquals('foo', $result);
    }

    public static function getMethods(): iterable
    {
        yield 'hasser' => [
            'foo',
            'hasfoo',
        ];
        yield 'getter' => [
            'foo',
            'getfoo',
        ];
        yield 'isser' => [
            'foo',
            'isfoo',
        ];
    }

    public function testInvalidArgumentExceptionIsThrownWhenNoMethodExists()
    {
        $component = new \stdClass();
        $provider = new \stdClass();

        $proxy = new MockedPropertiesProxy($component, $provider, []);

        $this->expectException(\InvalidArgumentException::class);

        $proxy->__call('foo', []);
    }
}
